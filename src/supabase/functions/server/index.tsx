import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import deliveryRoutes from "./delivery.tsx";
import paymentRoutes from "./payment.tsx";
import preOrderRoutes from "./pre-orders.tsx";

const app = new Hono();

// Create Supabase client for storage
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Bucket name for product images
const BUCKET_NAME = "make-dfbfad0c-products";

// Initialize storage bucket on startup
async function initStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      console.log(`Created bucket: ${BUCKET_NAME}`);
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
}

// Initialize delivery settings with auto-configured API keys
async function initDeliverySettings() {
  try {
    const existing = await kv.get('delivery_settings');
    if (!existing) {
      const defaultSettings = {
        courierMarkup: 200,
        cdekEnabled: true,
        boxberryEnabled: true,
        dellinEnabled: true,
        yandexEnabled: true,
        cdekApiKey: 'auto-configured-test',
        boxberryApiKey: 'auto-configured-test',
        dellinApiKey: 'auto-configured-test',
        yandexApiKey: 'auto-configured-test',
      };
      await kv.set('delivery_settings', defaultSettings);
      console.log('✅ Delivery settings auto-configured with test API keys');
    }
  } catch (error) {
    console.error("Error initializing delivery settings:", error);
  }
}

// Initialize on startup
initStorage();
initDeliverySettings();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dfbfad0c/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all products
app.get("/make-server-dfbfad0c/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products: products || [] });
  } catch (error) {
    console.error("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Get single product
app.get("/make-server-dfbfad0c/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const product = await kv.get(`product:${id}`);
    
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    return c.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return c.json({ error: "Failed to fetch product" }, 500);
  }
});

// Create product
app.post("/make-server-dfbfad0c/products", async (c) => {
  try {
    const body = await c.req.json();
    const { name, price, description, category, images, sizes, inStock } = body;
    
    if (!name || !price || !category) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const product = {
      id,
      name,
      price,
      description: description || "",
      category,
      images: images || [],
      sizes: sizes || ["S", "M", "L", "XL"],
      inStock: inStock !== undefined ? inStock : true,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, product);
    return c.json({ product }, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Failed to create product" }, 500);
  }
});

// Update product
app.put("/make-server-dfbfad0c/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, updatedProduct);
    return c.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

// Delete product
app.delete("/make-server-dfbfad0c/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    await kv.del(`product:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

// Get all orders
app.get("/make-server-dfbfad0c/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({ orders: orders || [] });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
});

// Create order
app.post("/make-server-dfbfad0c/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { customerInfo, items, totalAmount } = body;
    
    if (!customerInfo || !items || !totalAmount) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      id,
      customerInfo,
      items,
      totalAmount,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${id}`, order);
    return c.json({ order }, 201);
  } catch (error) {
    console.error("Error creating order:", error);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

// Update order status
app.put("/make-server-dfbfad0c/orders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingOrder = await kv.get(`order:${id}`);
    if (!existingOrder) {
      return c.json({ error: "Order not found" }, 404);
    }
    
    const updatedOrder = {
      ...existingOrder,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${id}`, updatedOrder);
    return c.json({ order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return c.json({ error: "Failed to update order" }, 500);
  }
});

// Upload image
app.post("/make-server-dfbfad0c/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return c.json({ error: "File must be an image" }, 400);
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: "File too large (max 5MB)" }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // Convert File to ArrayBuffer then to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, uint8Array, {
        contentType: file.type,
        cacheControl: "3600",
      });

    if (error) {
      console.error("Storage upload error:", error);
      return c.json({ error: "Failed to upload file" }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return c.json({ url: publicUrl }, 201);
  } catch (error) {
    console.error("Upload error:", error);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

// Add delivery routes
app.route("/make-server-dfbfad0c/delivery", deliveryRoutes);

// Add payment routes
app.route("/make-server-dfbfad0c/payment", paymentRoutes);

// Add pre-order routes
app.route("/make-server-dfbfad0c/pre-orders", preOrderRoutes);

Deno.serve(app.fetch);
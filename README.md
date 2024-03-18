<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <header>
    <h1>E-commerce Invoice Service </h1>
    <p>Node.js application providing RESTful APIs for managing products, shipping rates, and generating invoices.</p>
  </header>

  <section>
    <h2>Overview</h2>
    <p>This Node.js application provides RESTful APIs for managing products, shipping rates, and generating invoices for an e-commerce platform.</p>
  </section>

  <section>
    <h2>Features</h2>
    <ul>
      <li>CRUD operations for managing products and shipping rates.</li>
      <li>Invoice generation with detailed pricing breakdown.</li>
      <li>CORS handling for secure API access.</li>
      <li>Error handling for graceful application behavior.</li>
    </ul>
  </section>

  <section>
    <h2>Technologies Used</h2>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>MongoDB (Mongoose)</li>
      <li>RESTful API design principles</li>
    </ul>
  </section>

  <section>
    <h2>Installation</h2>
    <ol>
      <li>Clone the repository: <code>git clone &lt;repository-url&gt;</code></li>
      <li>Install dependencies: <code>npm install</code></li>
      <li>Set up environment variables:
        <ul>
          <li>Create a <code>.env</code> file based on <code>.env.example</code>.</li>
          <li>Provide necessary environment variables such as <code>PORT</code> and <code>MONGODB_URL</code>.</li>
        </ul>
      </li>
      <li>Start the server: <code>npm start</code></li>
    </ol>
  </section>

  <section>
    <h2>API Endpoints</h2>
    <h3>Products</h3>
    <ul>
      <li><strong>POST</strong> /api/v1/products/add-product - Add a new product</li>
      <li><strong>GET</strong> /api/v1/products/get-all-products - Get all products with pagination</li>
      <li><strong>GET</strong> /api/v1/products/fetch-product - Fetch a product by name</li>
      <li><strong>DELETE</strong> /api/v1/products/delete-product - Delete a product by ID</li>
    </ul>
    <h3>Shipping</h3>
    <ul>
      <li><strong>POST</strong> /api/v1/shipping/add-shipping-rate - Add a new shipping rate</li>
      <li><strong>GET</strong> /api/v1/shipping/get-all-shipping-rates - Get all shipping rates</li>
      <li><strong>GET</strong> /api/v1/shipping/fetch-shipping-by-code - Fetch shipping rate by country code</li>
      <li><strong>DELETE</strong> /api/v1/shipping/delete-shipping-by-code - Delete shipping rate by country code</li>
    </ul>
    <h3>Invoice</h3>
    <ul>
      <li><strong>POST</strong> /api/v1/invoice/generate-invoice - Generate an invoice based on product IDs</li>
    </ul>
  </section>

</body>

</html>

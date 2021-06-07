

const config = {
    endpoint: "https://petstore123.documents.azure.com:443/",
    key: "Y5AsutBZQbJE0n8619H2PWCXGDLrxF3Gqto3PZoTugpHJAsA8bQXhX8eZ0Lj3l1ZLyVYVymZP7BfAQf1A0B1kQ==",
    databaseId: "Petstoree",
    containerId: "Order",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
  module.exports = config;
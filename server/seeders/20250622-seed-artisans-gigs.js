"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("password123", 10);

    const artisans = [
      {
        name: "Lagos Artisan",
        email: "lagos@example.com",
        role: "artisan",
        password: passwordHash,
        latitude: 6.5244,
        longitude: 3.3792,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ibadan Artisan",
        email: "ibadan@example.com",
        role: "artisan",
        password: passwordHash,
        latitude: 7.3775,
        longitude: 3.947,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ede Artisan",
        email: "ede@example.com",
        role: "artisan",
        password: passwordHash,
        latitude: 7.7333,
        longitude: 4.4333,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ilesha Artisan",
        email: "ilesha@example.com",
        role: "artisan",
        password: passwordHash,
        latitude: 7.6167,
        longitude: 4.7333,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Osogbo Artisan",
        email: "osogbo@example.com",
        role: "artisan",
        password: passwordHash,
        latitude: 7.7667,
        longitude: 4.5667,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users
    await queryInterface.bulkInsert("Users", artisans);

    // Fetch inserted users
    const users = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Users" WHERE email IN ('lagos@example.com', 'ibadan@example.com', 'ede@example.com', 'ilesha@example.com', 'osogbo@example.com');`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Predefined gig categories
    const categories = [
      "Appliance Repair",
      "Plumbing",
      "Electrical Services",
      "House Cleaning",
      "Painting",
    ];

    // Image URLs per category (Unsplash links)
    const gigImages = {
      "Appliance Repair":
        "https://images.unsplash.com/photo-1616628182501-facb8fbc52f2?auto=format&fit=crop&w=800&q=80",
      Plumbing:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "Electrical Services":
        "https://images.unsplash.com/photo-1600252710615-c7ad2d08b8ad?auto=format&fit=crop&w=800&q=80",
      "House Cleaning":
        "https://images.unsplash.com/photo-1592150496756-b65c1d5b7c3d?auto=format&fit=crop&w=800&q=80",
      Painting:
        "https://images.unsplash.com/photo-1589987607627-3522d6e3b3a3?auto=format&fit=crop&w=800&q=80",
    };

    const gigs = [];

    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const category = categories[i];
        gigs.push({
          title: `${category} by ${user.name}`,
          description: `Top-notch ${category.toLowerCase()} services provided by ${user.name}`,
          category: category,
          price: 10000 + i * 2500,
          image: gigImages[category],
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("Gigs", gigs);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Gigs", null, {});
    await queryInterface.bulkDelete("Users", {
      email: {
        [Sequelize.Op.in]: [
          "lagos@example.com",
          "ibadan@example.com",
          "ede@example.com",
          "ilesha@example.com",
          "osogbo@example.com",
        ],
      },
    });
  },
};

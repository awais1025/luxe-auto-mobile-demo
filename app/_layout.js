import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { AuthProvider } from "../contexts/AuthContext";

async function initDB(db) {
  const result = await db.getFirstAsync("PRAGMA user_version");
  const currentVersion = result?.user_version || 0;
  if (currentVersion < 1) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Produit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        description TEXT,
        prix INTEGER,
        image TEXT
      );

      CREATE TABLE IF NOT EXISTS Client (
        nom TEXT PRIMARY KEY,
        mdp TEXT,
        admin INTEGER, 
        adresse TEXT,
        langue TEXT
      );
    `);
    await db.execAsync(`
      INSERT OR IGNORE INTO Client (nom, mdp, admin, adresse, langue)
      VALUES ('master', 'password', 1, '1234', 'fr');

      INSERT OR IGNORE INTO Produit (nom, description, prix, image) VALUES
      ('Porsche GT3 RS', 'Voiture allemande ', 400000, '../images/defaultVoiture.jpg'),
      ('BMW M4', 'Voiture allemande ', 100000, '../images/defaultVoiture.jpg'),
      ('Lamborghini Huracan', 'Voiture italienne ', 500000, '../images/defaultVoiture.jpg'),
      ('Ferrari LaFerrari', 'Voiture italienne ', 5000000, '../images/defaultVoiture.jpg'),
      ('Bugatti Chiron', 'Voiture suisse ', 3000000, '../images/defaultVoiture.jpg'),
      ('McLaren 720S', 'Voiture britannique ', 400000, '../images/defaultVoiture.jpg'),
      ('Ferrari 488 Spider', 'Voiture italienne ', 450000, '../images/defaultVoiture.jpg');
      `);
    await db.execAsync("PRAGMA user_version = 1;");
  }
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="pfi2.db" onInit={initDB}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(client)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SQLiteProvider>
  );
}
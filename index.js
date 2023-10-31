import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Piscina } from 'piscina';

await fs.mkdir("data", { recursive: true });

const piscina = new Piscina({
	filename: new URL("./worker.js", import.meta.url).href
})

const data = JSON.parse(await fs.readFile("ids.json"));
const promises = [];

for (const id of data) {
	if (fsSync.existsSync(path.join('data', id + ".json"))) continue;
	promises.push(piscina.run({ id }));
}

await Promise.all(promises);

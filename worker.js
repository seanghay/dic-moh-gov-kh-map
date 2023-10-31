import fs from 'node:fs/promises'
import path from 'node:path';
import axios from 'axios';


export default async function ({ id }) {
	try {
		const url = `https://dic.moh.gov.kh/map/ajGetBoundary/${id}`;
		const { data } = await axios.get(url, { responseType: "arraybuffer" });
		const buffer = Buffer.from(data);
		await fs.writeFile(path.join("data", id + ".json"), buffer);
		console.log(id);
	} catch(e) {
		if (axios.isAxiosError(e)) {
			console.log(e.response.statusText);
			console.log(e.response.data.toString());
			return
		}
		console.error(e);
	}
}
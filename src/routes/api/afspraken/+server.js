import { json } from '@sveltejs/kit';

const afspraken = [
	{ id: 1, klant: 'Jan Jansen', datum: '2025-06-15', tijd: '10:00', dienst: 'Massage' },
	{ id: 2, klant: 'Piet Pietersen', datum: '2025-06-16', tijd: '11:00', dienst: 'Knippen' },
	{ id: 3, klant: 'Big Mac enjoyer', datum: '2026-08-03', tijd: '9:00', dienst: 'Big Mac testen' }
	// Voeg meer afspraken toe indien gewenst
];

export function GET() {
	return json(afspraken);
}

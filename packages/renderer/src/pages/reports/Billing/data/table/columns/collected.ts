import math from '@/math';
import { genNAColumns } from '@/lib/utils';
import type { Appointment } from '../../parse';
import { pastAppts } from '../../filter';

/** Columns `Total Expected`, `Collect %` */
export default function collected(appts: Appointment[]) {
	appts = pastAppts(appts);
	if (appts.length === 0) {
		genNAColumns(['Total Expected', 'Collected %']);
	}

	const paid: number = math.sum(appts.map((appt) => appt.total.paid));
	const expected: number = math.sum(appts.map((appt) => appt.total.expected));

	let collected = (paid / expected) * 100;
	if (paid === 0) collected = 0;

	return {
		'Total Expected': expected,
		'% Collected': collected.toFixed(1) + '%',
	};
}

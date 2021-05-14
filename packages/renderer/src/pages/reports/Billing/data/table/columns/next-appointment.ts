import { format } from 'date-fns';
import { genNAColumns } from '@/lib/utils';
import type { Appointment } from '../../parse';
import { futureAppts } from '../../filter';

export default function nextAppt(appts: Appointment[]) {
	appts = futureAppts(appts);
	if (appts.length === 0) return genNAColumns('Next Appointment');

	appts.sort((a, b) => a.date.getTime() - b.date.getTime());

	const appt = appts[0];

	return {
		'Next Appointment': `${format(appt.date, 'Pp')} / ${appt.clinician}`,
	};
}

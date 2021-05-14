import math from '@/math';
import { genNAColumns } from '@/lib/utils';
import type { Appointment } from '../../parse';
import { pastAppts } from '../../filter';

/** Columns `Patient Paid`, `Insurance Paid`, `Paid Total` */
export default function paid(appts: Appointment[]) {
	appts = pastAppts(appts);
	if (appts.length === 0) {
		return genNAColumns(['Patient Paid', 'Insurance Paid', 'Paid Total']);
	}

	const pPaid = appts.map((appt) => {
		return appt.patient.balance.paid;
	});
	const patientPaidSum: number = math.sum(pPaid);

	const iPaid = appts.map((appt) => {
		return appt.insurance.balance.paid;
	});
	const insurancePaidSum: number = math.sum(iPaid);

	// const patientPaid: TableDataObject = {
	// 	value: 0,
	// 	text: $(0),
	// };
	// if (pPaid.length > 0) {
	// 	const sessions = pPaid.filter((v) => v).length;
	// 	patientPaid.text = $(patientPaidSum);
	// 	patientPaid.value = patientPaidSum;
	// 	if (sessions > 0) patientPaid.title = `Paid from ${sessions} sessions`;
	// }

	// const insurancePaid: TableDataObject = {
	// 	value: 0,
	// 	text: $(0),
	// };
	// if (iPaid.length > 0) {
	// 	insurancePaid.text = $(insurancePaidSum);
	// 	insurancePaid.value = insurancePaidSum;
	// 	insurancePaid.title = `Paid from ${iPaid.length} sessions`;
	// }

	return {
		'Patient Paid': patientPaidSum,
		'Insurance Paid': insurancePaidSum,
		'Paid Total': patientPaidSum + insurancePaidSum,
	};
}

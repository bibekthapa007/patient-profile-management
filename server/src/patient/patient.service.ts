import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
    public  getPatients() {
        return [{id: "1", name: "Patient"}]
    }
}

export class VacationModel {
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    imageFileName: File;
    followersCount?: number;
    isFollowed?: boolean;

    constructor(vacationId: number, destination: string, description: string, startDate: string, endDate: string, price: number, imageFileName: File, followersCount?: number, isFollowed?: boolean){
        this.vacationId = vacationId;
        this.destination = destination;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.imageFileName = imageFileName;
        this.followersCount = followersCount;
        this.isFollowed = isFollowed;
    }
}
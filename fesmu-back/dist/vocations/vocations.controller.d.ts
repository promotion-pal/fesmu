import { VocationsService } from './vocations.service';
import { CreateVocationDto } from './dto/create-vocations.dto';
export declare class VocationsController {
    private readonly vocationsService;
    constructor(vocationsService: VocationsService);
    get(): Promise<import("./entities/vocations.entity").VocationEntity[]>;
    create(dto: CreateVocationDto): Promise<import("./entities/vocations.entity").VocationEntity>;
}

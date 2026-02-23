import { VocationsService } from './vocations.service';
import { VocationDto } from './dto/vocations.dto';
export declare class VocationsController {
    private readonly vocationsService;
    constructor(vocationsService: VocationsService);
    get(): Promise<import("./entities/vocations.entity").VocationEntity[]>;
    create(dto: VocationDto): Promise<import("./entities/vocations.entity").VocationEntity>;
}

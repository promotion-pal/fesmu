import { FloorsService } from './floors.service';
import { FloorDto } from './dto/floor.dto';
export declare class FloorsController {
    private readonly floorsService;
    constructor(floorsService: FloorsService);
    findAll(): Promise<import("./entities/floor.entity").FloorEntity[]>;
    create(dto: FloorDto): Promise<import("./entities/floor.entity").FloorEntity>;
}

import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';
export declare class FloorsController {
    private readonly floorsService;
    constructor(floorsService: FloorsService);
    findAll(): Promise<import("./entities/floor.entity").FloorEntity[]>;
    create(createFloorDto: CreateFloorDto): Promise<import("./entities/floor.entity").FloorEntity>;
}

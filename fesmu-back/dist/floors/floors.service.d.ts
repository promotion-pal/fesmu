import { FloorEntity } from './entities/floor.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateFloorDto } from './dto/create-floor.dto';
export declare class FloorsService {
    private readonly floorRepository;
    constructor(floorRepository: Repository<FloorEntity>);
    findAll(): Promise<FloorEntity[]>;
    create(dto: CreateFloorDto): Promise<FloorEntity>;
    findOneWithConditions(conditions: FindOptionsWhere<FloorEntity>): Promise<FloorEntity>;
    findAllWithConditions(conditions: FindOptionsWhere<FloorEntity>): Promise<FloorEntity[]>;
}

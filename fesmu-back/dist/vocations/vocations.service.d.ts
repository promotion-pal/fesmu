import { VocationEntity } from './entities/vocations.entity';
import { Repository } from 'typeorm';
import { VocationDto } from './dto/vocations.dto';
export declare class VocationsService {
    private readonly vocationRepository;
    constructor(vocationRepository: Repository<VocationEntity>);
    get(): Promise<VocationEntity[]>;
    create(dto: VocationDto): Promise<VocationEntity>;
}

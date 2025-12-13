import { VocationEntity } from './entities/vocations.entity';
import { Repository } from 'typeorm';
import { CreateVocationDto } from './dto/create-vocations.dto';
export declare class VocationsService {
    private readonly vocationRepository;
    constructor(vocationRepository: Repository<VocationEntity>);
    get(): Promise<VocationEntity[]>;
    create(dto: CreateVocationDto): Promise<VocationEntity>;
}

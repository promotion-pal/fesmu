export declare enum TenantFaculty {
    PEDIATRIC = "pediatric",
    MEDICAL = "medical",
    DENTAL = "dental",
    PHARMACEUTICAL = "pharmaceutical"
}
export declare class TenantEntity {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    room: number;
    group: number;
    faculty: TenantFaculty;
}

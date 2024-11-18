export declare enum task_status {
    pendinct = "Pendiente",
    inprogrss = "En progreso",
    completed = "completada"
}
export declare class EntidadTareas {
    id: string;
    title: string;
    description: string;
    status: task_status;
}

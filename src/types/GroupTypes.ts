export interface Grupo {
    id_grupo: number;
    nombre: string;
    semestre: string;
}

export interface GrupoCode {
    codigo: string;
}

export interface AddGrupoCode {
    grupoId: number;
    codigo: string;
}  
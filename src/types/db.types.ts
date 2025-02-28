const tableNames = ["users", "categories", "blogs"] as const
export type TTablesValidNames = typeof tableNames[keyof typeof tableNames]; 
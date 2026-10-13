// Configuração do Appwrite. Preencha com os dados do seu projeto (veja o README).
// Enquanto o projectId estiver como "SEU_PROJECT_ID", o sistema abre em modo demonstração.
window.ESCALA_CONFIG = {
  appwrite: {
    endpoint: "https://fra.cloud.appwrite.io/v1", // API Endpoint do projeto (Settings)
    projectId: "6acbff2d002e4d3afe17",          // Project ID (Settings)
    databaseId: "SEU_DATABASE_ID",              // ID do banco que você já tem (pode ser o mesmo do Jaguarmove)
    collectionId: "escala_registros"            // tabela nova criada só para a escala
  }
};

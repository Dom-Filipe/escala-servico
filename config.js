// Configuração do Appwrite. Preencha com os dados do seu projeto (veja o README).
// Enquanto o projectId estiver como "SEU_PROJECT_ID", o sistema abre em modo demonstração.
window.ESCALA_CONFIG = {
  appwrite: {
    endpoint: "https://cloud.appwrite.io/v1",   // API Endpoint do projeto (Settings), com /v1 no final
    projectId: "SEU_PROJECT_ID",                // Project ID (Settings)
    databaseId: "SEU_DATABASE_ID",              // ID do banco que você já tem (pode ser o mesmo do Jaguarmove)
    collectionId: "escala_registros"            // tabela nova criada só para a escala
  }
};

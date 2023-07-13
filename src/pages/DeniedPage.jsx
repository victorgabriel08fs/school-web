const DeniedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-red-500 text-white p-8 rounded">
                <h1 className="text-4xl font-bold mb-4">Acesso Negado</h1>
                <p>Desculpe, você não tem permissão para acessar esta página.</p>
            </div>
        </div>
    );
}

export default DeniedPage;
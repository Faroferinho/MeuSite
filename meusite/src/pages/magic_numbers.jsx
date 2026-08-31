import DragNDrop from "../components/DragNDrop";

export default function MagicNumbers(){
    return(
        <>
            <div className="content">
                <h1>Arquivos e Magic Numbers</h1>
                <hr className="divider"/>
                <DragNDrop />
                <p>
                    Basicamente consta em um serviço de confirmação de tipo de arquivo via magic numbers. Uma forma que malware pode infectar dispositivos de forma integrada e fluida é disfarçando o tipo de arquivo que aquele arquivo faz parte, podemos disfarçar um tipo de arquivo como um de outro tipo, como um pdf ou uma imagem, uma forma rápida de encontrar esse tipo de malware é checando se a assinatura do arquivo combina com o tipo de arquivo da imagem. A assinatura da imagem, geralmente consistindo em um “numero mágico” (que se você já estudou técnicas de refatoramento você vai estar familiar com esse code-smell) é um numero que pessoas que não estão familiarizado com a estrutura onde ele está presente não entendem em um primeiro momento qual o seu propósito. A assinatura de arquivos normalmente aparece nos primeiros bytes de um arquivo, diferentes arquivos tem diferêntes tamanhos, em alguns casos tendo offsets ou dados dentro da assinatura que devem ser levados em consideração.
                </p>
                <p>O programa então vai funcionar da seguinte forma: </p>
                <ul>
                    <li>
                        Os primeiros bytes do arquivo vão ser enviados para a API;
                    </li>
                    <li>
                        A API vai guardar o nome do arquivo, a assinatura, as assinaturas esperadas para esse tipo de arquivo e se combina ou não esse tipo de arquivo
                    </li>
                    <li>
                        A API retorna os dados;
                    </li>
                    <li>
                        O site via mostrar os dados visualmente para você;
                    </li>
                </ul>
            </div>
        </>
    );
}
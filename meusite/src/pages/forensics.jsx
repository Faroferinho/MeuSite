import TableOfContents from "../components/TableOfContents";
import CodeBlock from "../components/CodeBlock";

export default function Forensics(){
    return (
        <>
            <div className="content">
                <h1>Forense Digital</h1>
                <p>
                    Forense Digital é um ramo da ciência forense que envolve a recuperação, investigação, examinação e analise de material envolvendo qualquer dispositivo digital, se tornando progressivamente mais prevalente conforme a comodidade de dispositivos digitais também acarreta na capacidade de explorar os mesmos para atividade criminais. As etapas em que pode se categorizar uma técnica são: Aquisição, Analise e Relatório.
                </p>
                <p>
                    O primeiro e mais fundamental passo é organizar a nossa mesa de trabalho. Precisamos nos certificar de que:
                </p>
                <ol>
                    <li>
                        Há um lugar para armazenar as nossas imagens, de preferência em um dispositivo de armazenamento removível (por questões de segurança) que contenha pastas para cada caso que você vai trabalhar.
                    </li>
                    <li>
                        Diretórios ou volumes para armazenar as saídas das ferramentas forenses e informações sobre as mídias forenses;
                    </li>
                    <li>
                        Algum diretório para servir de ponto de montagem;
                    </li>
                    <li>
                        Um local para documentar as operações efetuadas, como os hashes, listas de arquivos, resultado de anti-virús;
                    </li>
                </ol>


                <h2 id="terminal">Terminal</h2>


                <h2 id="colecting">Coletando Evidencias</h2>
                <p>
                    Evidencias no nosso contexto podem ser definidos como dados que podem ser empregados em uma investigação criminal, podendo ser coletados de dispositivos que armazenem dados, sejam eles desktops, laptops, telefones celulares ou HDs, mas isso definitivamente não é uma lista exaustiva. Independente da origem, as moções da coleta de evidências vão ser as mesmas, incorporando normalmente uma cópia em nível de setor da mídia, o que tem evoluído bastante na última década devido a computação em nuvem e dispositivos de armazenamento de dados progressivamente mais inchados.
                </p>
                <p>
                    Naturalmente por ser um campo forense, devem ser tratadas com um mesmo respaldo que qualquer outro tipo de evidencia, exigindo imutabilidade e confiabilidade. Imutabilidade é garantida via bloqueadores de escrita sobre a evidência, normalmente um physical write blocker que é um aparelho caro que impede o disco de ser escrito. Confiabilidade é garantido por meio de uma assinatura hash, um valor resultado de um algoritmo de hash do nó do dispositivo ou da imagem que ajuda garantir que você não alterou aquele documento de forma desnecessária.
                </p>
                <p>
                    O processo de coleta de evidencias, consistindo em efetuar o hash do disco e armazenar esse valor em um arquivo de texto (para comparar depois); Após isso, podemos começar a descobrir mais sobre os discos, como tipo de sistema de arquivos e tamanho de setores; Posteriormente criamos cópias do disco para podemos montar e examinar.
                </p>
                <p>
                    Primeiramente podemos fazer a pipeline efetuando um hash no nó de dispositivo do hd sendo estudado e direcionando a saída para um arquivo de texto. Hashing é um aspécto da ciencia forense por ajudar na preservação de evidências digitais, pois é uma função matemática unidirecional que pega dados independente de seu tamanho e os transformam em uma string de caracteres sempre um um número fixo de tamanho, sendo a saída única e irreversível, sendo computacionalmente não muito viável encontrar dois inputs distintos de mesmo resultado (isso é chamada de colisão). A escolha de algoritmos é extremamente importante para o trabalho, portanto saiba os pontos fortes e fracos de cada algoritmo, os principais são <u>Message-Digest Algorithm 5</u>, o <u>Secure Hash Algoritm</u> <u>1</u>, <u>256</u> & <u>512</u>:
                </p>
                
                <ul>
                    <li>
                        <u><b>MD5</b></u> - O Message-Digest Algorithm, também chamado de MD5 é um algoritmo amplamente difundido produzindo um valor de hash de 128 bits, porém é vulnerável a colisões, sendo menos do que ideal em situações onde você usa dados criptografados;
                    </li>
                    <li>
                        <u><b>SHA-1</b></u> - O Algoritmo 1 do Security Hashing Algoritm é um algoritmo que retorna um valor hash de 160 bits, sendo mais seguro que o MD5, mas ainda assim é vulnerável a colisões, o que levou ele a ser seguido por algoritmos mais seguros;
                    </li>
                    <li>
                        <u><b>SHA-256</b></u> - O Algoritmo de Hashing de Segurança 256, ou Security Hashing Algoritm 256, é um algoritmo de hash de segurança popularmente empregado em casos que exigem alta seguridade por ter alta resistência de colisão;</li>
                    <li>
                        <u><b>SHA-512</b></u> - O algoritmo mais recente do Security Hashing Algoritm, bem mais robusto e mais mais seguro;
                    </li>
                </ul>
                <p>
                    A escolha de Algoritmo depende sempre dos requisitos da investigação, mas para aplicações no mundo real o algoritmo SHA-1 é mais do que suficiente.
                </p>
                <p>
                    Com as evidencias coletadas existem dois caminhos que podemos prosseguir, podemos apenas examinar o arquivo, ou seja usar ferramentas especializadas como um hex-dump para avaliar as informações coletadas e examinar todo o espaço físico que o disco opera, alternativamente podemos analisar o arquivo como se fosse um sistema de arquivos montado e analisar o arquivo de forma lógica.
                </p>
                <p>
                    Para montar o sistema de arquivos da imagem primeiramente precisamos descobrir informações sobre o disco original, para isso empregamos o comando file, ou caso tenha acesso ao super-usuário do sistema podemos empregar o fdisk -l ou o gdisk:
                </p>
                <a>
                    <CodeBlock 
                        code={"file <imagem>"}
                        language={"Terminal"}
                    />
                </a>
                <a>
                    <CodeBlock 
                        code={"fdisk -l <imagem>"}
                        language={"Terminal"}
                    />
                </a>
                <a>
                    <CodeBlock 
                        code={"gdisk <imagem>"}
                        language={"Terminal"}
                    />
                </a>
                <p>
                    Averiguando a saída coletamos informações valiosas, sendo elas tamanho da imagem, tamanho das unidades, tipo de disklabel e quantas partiçções existem. A partir dai podemos empregar a interface loop para “simular” um dispositivo conectado, empregar o sistema de arquivos encontrado no passo anterior e o ponto de montagem, empregamos também a opção read-only (ro) para evitar sobre escrever de forma acidental:
                </p>
                <CodeBlock
                    code={"mount -t <Sistema_de_arquivos> -o ro,loop <Arquivo> <Ponto_de_Montagem>"}
                    language={"Terminal"}
                />
                <h3 id="colecting-physical">
                    HD Físico
                </h3>
                <h3 id="colecting-network">
                    Via Rede
                </h3>
                <h3 id="colecting-mobile">
                    Dispositivos Móveis
                </h3>
                <h3 id="colecting-miscellaneous">
                    Outros
                </h3>
                <h2 id="analysis">
                    Analise
                </h2>
                <h3 id="analysis-antivirus">
                    Antí-Virús
                </h3>
                <h3 id="analysis-integrity">
                    Checagem de Integridade
                </h3>
                <h3 id="analysis-search">
                    Buscando na Imagem
                </h3>
                <h2 id="documentation">
                    Documentação
                </h2>

                <TableOfContents />
            </div>
        </>
    );
}
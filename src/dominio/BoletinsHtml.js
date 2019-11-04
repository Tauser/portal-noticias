
module.exports = class BoletinsHtml {
    
    static geraBoletinsHtml(dados) {
        const tagStyle = this._styleTag();
        const tagTable = this._tableTag(dados);

        const boletins = `${tagStyle}
        ${tagTable}`;

        return { boletins };
    }

    static _styleTag() {
        return `<style>
            thead tr { display: flex; align-items: center; justify-content: center; }
            tbody tr { display: flex; align-items: center; justify-content: center; flex-direction: column; margin: .8rem auto; }
            ul { width: 100%; }
            ul li { margin: .5% auto; color: #576567;}
        </style>`;
    }

    static _tableTag(dados) {    
        const thead = this._tHead(dados.dia);
        const tbody = this._tBody(dados.conteudo);

        return `<table cellspacing="10" cellpadding="5" border="0" width="100%" bgcolor="#e6f0ef">
            ${thead}
            ${tbody}
        </table>`;
    }

    static _tHead(dia) {
        const dataCompleta = (dia) ? dia : '';

        return `<thead bgcolor="#004a2f">
        <tr>
            <th width="100%">
                <a href="https://www.camara.leg.br/" target="new" title="Câmara dos Deputados" style="display: inline-block; margin: .5% auto;">
                    <img src="https://www.camara.leg.br/tema/assets/images/logo-brand-camara-desktop.png" alt="Logo Câmara dos Deputados" boder="0">
                </a>
            </th>
        </tr>
        <tr bgcolor="#ffffff">
            <th width="100%">
                <h1 style="margin: 0.3% auto; font-family: sans-serif; font-weight: 700; font-size: 1.8rem; text-transform: uppercase;">Notìcias</h1>
                <small style="font-size: .75rem; text-transform: uppercase; font-family: sans-serif; line-height: 1.5; font-weight: 400; color:#6b6b6b">
                    ${dataCompleta}
                </small>
            </th>
        </tr>
    </thead>`;
    }

    static _tBody(conteudo) {
        let tr = '';
        conteudo.forEach(row => {
            tr = `${tr}
            <tr>
               <td  width="100%">
                   <h3 style="font-family: sans-serif; font-weight: 600; line-height: 1.2; font-size: 1.2rem; text-transform: uppercase;">
                       <a href="https://www.camara.leg.br${row.linkTema}" style="text-decoration: none; color: #000000;">
                           ${row.tema}
                       </a>
                    </h3>
               </td>
               <td bgcolor="#FFFFFF" width="99%">
                   <ul style="width: 100%;" >
                       ${this._li(row.noticias)}
                    </ul>
               </td>
            </tr>`;
        });
        return `<tbody>
            ${tr}
        </tbody>`;
    }

    static _li(noticias) {
        let li = '';

        noticias.forEach(noticia => {
            li  = `${li}
            <li>
                <a href="${noticia.link}" style="text-decoration: none; color:#576567; font-family: sans-serif; font-weight: 400; font-size: 1rem;" 
                    title="${noticia.titulo}">
                    ${noticia.titulo}
                </a>
            </li>`;
        });
        return li;
    }
};
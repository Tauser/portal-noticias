const { programacaoSemanal, interprogramas } = require('./programacao-semanal-radio/programacao-radio');

let active = false;

module.exports = class ProgramacaoRadio {

    static diasDaSemana(hoje) {
        const semana = [];

        programacaoSemanal.forEach(programacao => {
            const dia = programacao.dia;
            const id  = this._geraId(dia);
            semana.push({ id, dia, active });
        });

        semana[hoje].active = true;

        return semana;
    }

    static getIterprogramas() {
        return interprogramas;
    }

    static getProgramacaoSemanal(hoje) {
        const programacao = [];

        programacaoSemanal.forEach(grade => {
            const dia = grade.dia;
            const programas = grade.programas;
            const id = this._geraId(dia);

            programacao.push({
                id,
                dia,
                active,
                programas
            });
        });

        programacao[hoje].active = true;

        return programacao;
    }

    static _geraId(dia) {
       return dia.toLowerCase().replace(/[\W]/g, '_');
    }

};
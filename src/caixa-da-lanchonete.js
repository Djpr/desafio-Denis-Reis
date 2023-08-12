
class CardapioItem {
    constructor(codigo, descricao, valor) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

class Cardapio {
    constructor() {
        this.itens = [
            new CardapioItem('cafe', 'Café', 3.00),
            new CardapioItem('chantily', 'Chantily (extra do Café)', 1.50),
            new CardapioItem('suco', 'Suco Natural', 6.20),
            new CardapioItem('sanduiche', 'Sanduíche', 6.50),
            new CardapioItem('queijo', 'Queijo (extra do Sanduíche)', 2.00),
            new CardapioItem('salgado', 'Salgado', 7.25),
            new CardapioItem('combo1', '1 Suco e 1 Sanduíche', 9.50),
            new CardapioItem('combo2', '1 Café e 1 Sanduíche', 7.50)
        ];
    }

    encontrarItemPorCodigo(codigo) {
        return this.itens.find(item => item.codigo === codigo);
    }
}

class CalculadoraCompra {
    constructor(cardapio) {
        this.cardapio = cardapio;
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const formasPagamento = ['debito', 'credito', 'dinheiro'];
        const formaPagamento = formaDePagamento.toLowerCase();

        if (!formasPagamento.includes(formaPagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const carrinhoItens = [];

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            const menuItem = this.cardapio.encontrarItemPorCodigo(codigo);

            if (menuItem) {
                carrinhoItens.push({ codigo, quantidade });
                total += menuItem.valor * parseFloat(quantidade);
            } else {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
        }

        for (const item of carrinhoItens) {
            if (item.codigo === 'chantily') {
                const cafeItem = carrinhoItens.find(it => it.codigo === 'cafe');
                if (!cafeItem) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            } else if (item.codigo === 'queijo') {
                const sanduicheItem = carrinhoItens.find(it => it.codigo === 'sanduiche');
                if (!sanduicheItem) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }
        }

        if (formaPagamento === 'credito') {
            total *= 1.03;
        } else if (formaPagamento === 'dinheiro') {
            total *= 0.95;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = new Cardapio();
        const calculadora = new CalculadoraCompra(cardapio);
        return calculadora.calcularValorDaCompra(formaDePagamento, itens);
    }
}


// const caixa = new CaixaDaLanchonete();
// const formaDePagamento = 'credito';
// const itens = ['combo1,1', 'cafe,2'];

// const valorTotal = caixa.calcularValorDaCompra(formaDePagamento, itens);
// console.log(valorTotal);


export { CaixaDaLanchonete };

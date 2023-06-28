$(document).ready(function() {
    var unidades = new Map();
    function getUnidade() {
        var start = 0;
        var total = 50;
        while(start < total){
            $.ajax({
                url: "https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=109&start=" + start,
                dataType: 'json',
                async: false
            })
            .done(function(data) {
                start = data.next ?? data.total;
                total = data.total;
                data.result.forEach(function(obj){
                    unidades.set(parseInt(obj["ID"]),obj["NAME"])
                })
            });
        }
    };

    getUnidade();
    console.log(unidades.get(203993));

    $('#unidade').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=109',
            dataType: 'json',
            delay: 300,
            data: function(params){
                console.log(params.page)
                page = params.page ?? 1
                var query = {
                    SELECT:["NAME"],
                    ORDER:{
                        "NAME":"ASC"
                    },
                    FILTER: {
                        "%NAME": params.term
                    },
                    start: (page-1) * 50
                }
                
                return query;
            },
            processResults: function(data, params){
                itens = $.map(data.result,function(obj){
                            return {
                                id: obj["ID"], 
                                text: obj["NAME"]
                            }
                        }); 
                return{
                    results: itens, 
                    pagination: { "more": data.next ? true : false}
                }
        }   }        
     });

    $('#atividades').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/lists.element.get?IBLOCK_TYPE_ID=lists&IBLOCK_ID=59',
            dataType: 'json',
            delay: 300,
            data: function(params){
                var query = {
                    FILTER: {"%NAME": params.term}
                }
                return query;
            },
            processResults: function(data){
                itens = $.map(data.result,function(obj){
                            return {id: obj["ID"], text:obj["NAME"]}
                        }); 
                        return{
                    results: itens
                }
            }
        }                
     });

    $('#contato').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list',
            dataType: 'json',
            delay: 300,
            data: function(params){
                var query = {
                    FILTER: {
                        "%FULL_NAME": params.term}
                }
                return query;
            },
            processResults: function(data){
                itens = $.map(data.result,function(obj){
                            return {
                                id: obj["ID"], 
                                text:obj["NAME"] + obj["LAST_NAME"]
                            }
                        }); 
                        return{
                    results: itens
                }
            }
        }                
    });

    $('#pregador_responsavel').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list',
            dataType: 'json',
            delay: 300,
            data: function(params){
                var query = {
                    SELECT: [
                        "NAME", "LAST_NAME", "UF_CRM_1597062446"
                    ],
                    FILTER: {
                        "%FULL_NAME": params.term}
                }
                return query;
            },
            processResults: function(data){
                itens = $.map(data.result,function(obj){
                            return {
                                id: obj["ID"], 
                                text: obj["NAME"] + " " + obj["LAST_NAME"] + " (unidade: " + unidades.get(parseInt(obj["UF_CRM_1597062446"])) + ")"
                            }
                        }); 
                        return{
                    results: itens
                }
            }
        }                
    });

    $('#realizador').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list',
            dataType: 'json',
            delay: 300,
            data: function(params){
                var query = {
                    FILTER: {
                        "%FULL_NAME": params.term}
                }
                return query;
            },
            processResults: function(data){
                itens = $.map(data.result,function(obj){
                            return {
                                id: obj["ID"], 
                                text:obj["NAME"],
                                last_name: obj["LAST_NAME"]
                            }
                        }); 
                        return{
                    results: itens
                }
            }
        }                
    });

    $('#participantes').select2({
        ajax:{
            url: 'https://religiaodedeus.bitrix24.com/rest/1618/eid3z4w5t9h1dw8y/crm.contact.list',
            dataType: 'json',
            delay: 300,
            data: function(params){
                var query = {
                    FILTER: {
                        "%FULL_NAME": params.term}
                }
                return query;
            },
            processResults: function(data){
                itens = $.map(data.result,function(obj){
                            return {
                                id: obj["ID"], 
                                text:obj["NAME"],
                                last_name: obj["LAST_NAME"]
                            }
                        }); 
                        return{
                    results: itens
                }
            }
        }                
    })
});

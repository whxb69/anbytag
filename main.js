define([
    "base/js/namespace",
    "jquery",
    "bootstrap",
    'base/js/events',
], function (IPython, $, bs, events) {
    "use strict";

    var tagsgo = function(){
    	var iftag = document.getElementsByClassName('tagcourt');
    	console.log(iftag);
    	if(iftag.length == 0){

        // var cells = document.getElementsByClassName('cell');

        var cells = $('.cell');

        for (var i = 0; i < cells.length; i++) {
            // var tagsdiv = document.createElement("div");
            // tagsdiv.classList.add('tagcourt');
            // tagsdiv.setAttribute("isshow",'true');

            var tagsdiv = $('<div/>').addClass('tagcourt').attr("isshow",'true');
            $('div.tagcourt').show();

            // var tagspan = document.createElement("span");
            // tagspan.classList.add('celltag')

            var tagspan = $('<span/>').addClass('celltag')

            var tagone = addtag('fa-bell-o');
            var tagtwo = addtag('fa-at');
            var tagthree = addtag('fa-ban');
            var tagfour = addtag('fa-commenting-o');
            var tagfive = addtag('fa-exclamation-circle')

            tagsdiv.append(tagspan);
            tagsdiv.append(tagone);
            tagsdiv.append(tagtwo);
            tagsdiv.append(tagthree);
            tagsdiv.append(tagfour);
            tagsdiv.append(tagfive);
            cells[i].append(tagsdiv.get(0));
        }

        var styleElement = document.getElementById('styles_js');

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }

        var newStyle = 'div#notebook-container.container{width:1200px};'+
            		   'div.tagcourt{width:240px}' +
            		   'div.inner_cell:{width:940px}'+
            		   'button.celltag{ padding: 4px 4px;border-radius:5px; border: 1px solid #F0F0F0;display: inline-block;margin : 1.5px;}'+
            		   'button.celltag:hover{background-color:#F0F0F0; border: 1px solid #C0C0C0}'+
            		   'i.removetag{margin-left: 4px;}'+
            		   'i.removetag:hover{cursor:pointer}'+
            		   'i.changetag:hover{cursor:pointer}'+
            		   'i.changetag:{border: 1px solid #F0F0F0; margin: 1.5px}'

        styleElement.appendChild(document.createTextNode(newStyle));

		var link = document.createElement("link");
    	link.rel = "stylesheet";
		link.type = "text/css";
		link.href = "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
		document.getElementsByTagName("head")[0].appendChild(link);
		}
		else{
			var tagdivs = document.getElementsByClassName('tagcourt');

			if(iftag[1].getAttribute('isshow') == 'true'){
				for (var i = 0; i < tagdivs.length; i++) {
					tagdivs[i].style.display = 'none';
					tagdivs[i].setAttribute("isshow",'false');
				}
			}

			else if(iftag[1].getAttribute('isshow') == 'false'){
				for (var i = 0; i < tagdivs.length; i++) {
					tagdivs[i].style.display = 'inline';
					tagdivs[i].setAttribute("isshow",'true');
				}
			}
		}
		// showtoolbar();

			var cells = IPython.notebook.get_cells();
			var divs = $('div.tagcourt');
			for(var i = 0;i < cells.length;i++){
				console.log(cells[i].metadata.tags);
				if(cells[i].metadata.tags){
					var tags = cells[i].metadata.tags;
					for(var j = 0;j < tags.length;j++){
						var tag = '.celltag.' + tags[j];
						var target = $(tag)[i];
						target.click();
						// cells[i].metadata.tags[cells[i].metadata.tags.length] = tags[j];
                        // $(tags[j]).click()
					}
				}
			}
    };

	var showtoolbar = function () {
		var iffliter = document.getElementsByClassName('tag_fliter');
		if (iffliter.length == 0){
			var tagfliter = $('<div class = "btn-group tag_fliter"></div>')
			var board = $("<span/>").text('标签过滤');

			$('#maintoolbar-container').append(board);

			tagfliter.append(tagcreate('fa-bell-o'));
			tagfliter.append(tagcreate('fa-at'));
			tagfliter.append(tagcreate('fa-ban'));
			tagfliter.append(tagcreate('fa-commenting-o'));
			tagfliter.append(tagcreate('fa-exclamation-circle'));

			var checkdiv = $('<div style = "display:inline"></div>');
			var checklabel = $('<label>          <input type="checkbox" id = "if-mul"> 强关联        </label>');
			// var ifmul = $('<input/>').attr("type",'checkbox');
			// 	checklabel.append(ifmul);
			// 	checklabel.text('强关联');
				checkdiv.append(checklabel);

			$('#maintoolbar-container').append(tagfliter);
			$('#maintoolbar-container').append(checkdiv);
		}

	}

	var tagcreate = function (icon){
		var classlist = "btn btn-default fliter_tag fa " + icon;
		var newb = $("<button/>").addClass(classlist)
                   .attr("type", 'button')
                   .attr("data-toggle",'button')
                   .attr("aria-pressed",'false')
                   .height(24.5);
            newb.click(function(){
                var tags = document.getElementsByClassName(icon);
                if($(this).attr('aria-pressed') == 'false'){
                    // console.log(tags);
                    if(tags.length > 0){
                        var cells = document.getElementsByClassName('rendered');

                        for(var i = 0;i < cells.length;i++ ){
                            if(cells[i].classList.contains('cell-show')==true){
　　　　                        cells[i].classList.remove('cell-show');
                            }
                        cells[i].classList.add("cell-hide");
                        $('div.cell-hide').hide();
                    }
                        console.log(tags);
                        for(var i = 0;i < tags.length;i++ ){
                            if(tags[i].getAttribute("aria-pressed") == 'true'){
                                var parent = tags[i].parentNode;
                                var div = parent.parentNode;
                                if(div.classList.contains('cell-hide')==true){
　　　　                            div.classList.remove('cell-hide');
                                }
                                div.classList.add('cell-show');
                                $('div.cell-show').show();
                            }
                        }
                    }
                    if($('#if-mul').val() == 'checked'){

                    }
                    var fliters = $('.fliter_tag');
                    for(var i = 0;i < fliters.length;i++){
                        if(fliters[i].getAttribute('aria-pressed') == 'true'){
                            var patt = /fa-.+\s/i;
                            var reslist = patt.exec(fliters[i].className);
                            var iconn = reslist[0].slice(0,-1);
                            var btns = $('button.celltag.' + iconn);
                            console.log(btns);
                            for(var j = 0;j < btns.length;j++){
                                if(btns[j].getAttribute("aria-pressed") == 'true'){
                                var parent = btns[j].parentNode;
                                var div = parent.parentNode;
                                if(div.classList.contains('cell-hide')==true){
　　　　                            div.classList.remove('cell-hide');
                                    div.classList.add('cell-show');
                                    }
                                    $('div.cell-show').show();
                                }
                            }
                        }
                    }
                }else{
                    var tags = document.getElementsByClassName('celltag active ' + icon);
                    for(var i = 0;i < tags.length;i++ ){
                        var parent = tags[i].parentNode;
                        var div = parent.parentNode;
                        if(div.classList.contains('cell-show')==true){
　　　　                    div.classList.remove('cell-show');
　　　　                    div.classList.add('cell-hide');
                        }
                    }
                    $('.cell-hide').hide()
                    var fliters = $('.fliter_tag');

                    //全部还原
                    var pressed = 0;                //被按下按钮计数
                    for(var i = 0;i < fliters.length;i++){
                        if(fliters[i].getAttribute('aria-pressed') == 'true'){
                            pressed++;
                        }
                    }
                    if(pressed == 1){
                        var cells = document.getElementsByClassName('rendered');
                        for (var i = 0; i < cells.length; i++) {
                            if(cells[i].classList.contains('cell-show')==false){
　　　　                        cells[i].classList.remove('cell-hide');
                                cells[i].classList.add('cell-show');
                            }
                        }
                        $('div.cell-show').show();
                    }
                }
            })
		return newb;
	}

	var addtag = function (icon) {													//标签按钮模板
		// var newtag = document.createElement('button');
  //           newtag.id = 'tagbutton';
  //           newtag.classList.add('celltag','btn','btn-default','fa');
  //           newtag.classList.add(icon);
  //           newtag.type = 'button';
  //           newtag.dataset.toggle = 'button';
  //           newtag.setAttribute("aria-pressed",'false');
  //           newtag.setAttribute("autocomplete",'off');

        var newtag = $('<button/>').addClass('celltag btn btn-default fa ' + icon)
        			 .attr("id",'tagbutton')
        			 .attr("type",'button')
        			 .attr("data-toggle",'button')
        			 .attr("aria-pressed",'false')
        			 .attr("autocomplete",'off')
        			 .click(function(bot){
        			 	var cells = IPython.notebook.get_cells();
        			 	var tags = $('.celltag.' + icon);
        			 	for(var k = 0;k < tags.length;k++){
        			 		if(tags[k] == this){
        			 			var num = k;
        			 			console.log(num);
        			 			break;
        			 		}
        			 	}
        			 	
        			 	var tags_on = [];
        			 	// if(cells[num].metadata.tags){
        			 	// 	tags_on = cells[num].metadata.tags;
        			 	// }
                        
       					var tagcourt = $('.tagcourt')[num];
       					var tags = $(tagcourt).children('.celltag');
       					for(var i = 0;i < tags.length;i++){
       						var patt = /fa-[-a-z]+\sactive/i;
                            var reslist = patt.exec(tags[i].className);
                            // console.log(reslist);
                            if(reslist != null){
                            	var iconn = reslist[0].slice(0,-7);
                            	console.log(iconn);
                            	tags_on[tags_on.length] = iconn;
                            }                          
       					}
                        
                        var cur = $(tagcourt).children('.celltag.' + icon);
                        console.log($(cur).attr("aria-pressed"));
                        if($(cur).attr("aria-pressed") == 'false'){
                        	tags_on[tags_on.length] = icon;
                    	}else{
                    		for(var j = 0;j < tags_on.length;j++){
                    			if(tags_on[j] == icon){
                    				tags_on.splice(j,1);
                    			}
                    		}
                    	}
                        console.log(tags_on);
                        cells[num].metadata.tags = tags_on;

        			 })
        return newtag;
	}

  var load_ipython_extension = function () {
  		events.on('notebook_loaded.Notebook', tagsgo);
        if (IPython.notebook._fully_loaded) tagsgo();

        IPython.toolbar.add_buttons_group([
            IPython.keyboard_manager.actions.register ({
                help   : 'add tag',
                icon   : 'fa-ticket',
                handler : showtoolbar
            }, 'add tags', 'tags')
        ]);
    };

  var extension = {
        load_ipython_extension : load_ipython_extension,
    };
    return extension;
});

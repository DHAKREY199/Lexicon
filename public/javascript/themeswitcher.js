! function($) {

    $(function() {

        $("head").append($('<link rel="stylesheet">').attr("href", "../demo/themeswitcher/minicolor/jquery.minicolors.css"));
        $("head").append($('<link rel="stylesheet">').attr("href", "../demo/themeswitcher/themeswitcher.css"));
        $("head").append($('<link rel="stylesheet/less">').attr("href", "assets/theme.less"));

        $.getScript("../demo/themeswitcher/minicolor/jquery.minicolors.js", function(data, textStatus, jqxhr) {

            less = {
                env: "development"
            };

            $.getScript('../demo/themeswitcher/less.js', function() {

                build();
                events();

            })

        })

        $.getScript("../demo/themeswitcher/cssbeautify/cssbeautify.js", function(data, textStatus, jqxhr) {});


        function build() {

            var themeswitcher = $('<div/>').attr('id', 'themeswitcher').html('<p>Select a color</p>')

            var minicolor = $('<input/>').attr('id', 'minicolor')
            var exportcss = $('<div/>').attr('id', 'exportcss').addClass('btn btn-default btn-small btn-sm').text('Get CSS');

            // Colors Skins
            var colors = [{
                "hex": "#0088CC",
                "name": "Bootstrap Blue"
            }, {
                "hex": "#63B76C",
                "name": "Fern"
            }, {
                "hex": "#E28913",
                "name": "Golden Belt"
            }, {
                "hex": "#C32148",
                "name": "Maroon Flush"
            }, {
                "hex": "#FB8989",
                "name": "Geraldine"
            }, {
                "hex": "#E97451",
                "name": "Burnt Sienna"
            }, {
                "hex": "#D84437",
                "name": "Valencia"
            }, {
                "hex": "#563D7C",
                "name": "Victoria"
            }];

            themeswitcher.append(minicolor)

            $.each(colors, function(i, v) {
                var box = $('<div/>').addClass('colorbox').css('background-color', v.hex).attr('title', v.name).data('hex', v.hex)
                themeswitcher.append(box)
            })

            themeswitcher.append(exportcss);

            $('body').append(themeswitcher)

            $('input#minicolor').minicolors({
                defaultValue: '#50a846',
                position: 'bottom right',
                change: function(color) {
                    setColor(color);
                }
            });

            var modal =
                '<div class="modal fade" id="exportcss-modal">'
                +  '<div class="modal-dialog">'
                +    '<div class="modal-content">'
                +      '<div class="modal-header">'
                +        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                +        '<h4 class="modal-title">Theme CSS</h4>'
                +      '</div>'
                +      '<div class="modal-body">'
                +        '<div class="alert alert-success">Create a new stylesheet with this css and include it after Bootstrap.</div>'
                +        '<textarea id="exportcss-text" class="form-control" readonly></textarea>'
                +      '</div>'
                +      '<div class="modal-footer">'
                +        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
                +      '</div>'
                +    '</div>'
                +  '</div>'
                +'</div>';

            $("body").append(modal);

        }

        function events() {

            $('.colorbox').click(function() {
                var $this = $(this);
                setColor($this.data('hex'));

                $('.colorbox').removeClass('selected');
                $this.addClass('selected');
            });

            $('#exportcss').click(function() {

                $("#exportcss-text").text("");

                var $style = $('style[id^="less:"]');

                $("#exportcss-text").text(
                    $style[0].innerText || $style[0].innerHTML || ($style[0].styleSheet && $style[0].styleSheet.cssText)
                );

                $("#exportcss-modal").modal("show");

                css = $("#exportcss-text").text();

                $("#exportcss-text").text(cssbeautify(css, {
                    indent: "\t",
                    autosemicolon: true
                }));

            });
        }

        function setColor(color) {
            less.modifyVars({
                themeColor: color
            });
        }

    })

}(window.jQuery)
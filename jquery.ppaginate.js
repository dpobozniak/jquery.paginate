/**
 * jQuery plugin paginates gallery images
 *
 * @author  Dariusz Pobożniak (http://pobozniak.pl)
 * @version 1.0
 *
 */
 
(function($) {
    $.fn.ppaginate = function(customOptions) {
        var defaultOptions = {
            perPage: 10,
            prev: '.prev',
            next: '.next',
            inactive: '.inactive',
            idPrefix: 'gal-',
            counter: null
        }
        var options = $.extend({}, defaultOptions, customOptions);
        
        var Paginate = {
            totalPages: 1,
            pageNo: 1,
            totalItems: 1,
            items: Object,
            from: 1,
            to: 1,
            first: true,
            last: true,
            
            init: function(obj) {
                this.items = obj;
                this.totalItems = obj.length;
                this.totalPages = Math.ceil(this.totalItems / options.perPage);
                if (this.totalItems > options.perPage) {
                    this.items.filter(':gt('+(options.perPage-1)+')').hide();
                    this.from = options.perPage;
                    this.last = false;
                    this.to = options.perPage;
                } else {
                    this.to = this.totalItems;
                }                
                if (options.counter !== null) {
                    this.setNav();
                }
            },
            
            goNext: function() {
                this.items.hide();
                this.to = this.from + options.perPage;
                this.items.slice(this.from, this.to).show();
                var max = this.to;
                if (this.to >= this.totalItems) {
                    this.last = true;
                    $(options.next).removeClass('active').addClass('inactive');
                    max = this.totalItems;
                }
                this.setCounter((this.from+1) + '-' + max + ' | ' + this.totalItems);
                this.from = this.to;
                $(options.prev).removeClass('inactive').addClass('active');
            },
            
            goPrev: function() {
                this.items.hide();
                this.to = this.from - options.perPage;
                this.items.slice(this.to - options.perPage, this.to).show();
                var min = this.to-options.perPage+1;
                if (this.to == options.perPage) {
                    this.first = true;
                    $(options.prev).removeClass('active').addClass('inactive');
                    min = 1;
                }
                this.setCounter(min + '-' + this.to + ' | ' + this.totalItems);
                this.from = this.to;
                $(options.next).removeClass('inactive').addClass('active');
            },
            
            setCounter: function(txt) {
                $(options.counter).text(txt);
            },
            
            setNav: function() {
                $(options.counter).text('1-'+this.to+' | '+this.totalItems);
                if (this.first == true) {
                    $(options.prev).removeClass('active').addClass('inactive');
                }
                if (this.last == true) {
                    $(options.next).removeClass('active').addClass('inactive');
                }
                $(options.next).click(function() {
                    if ($(this).hasClass('active')) {
                        Paginate.goNext();
                    }
                });
                $(options.prev).click(function() {
                    if ($(this).hasClass('active')) {
                        Paginate.goPrev();
                    }
                });
            }
        }
        
        Paginate.init($(this));
        
        return this;
    }
})(jQuery);

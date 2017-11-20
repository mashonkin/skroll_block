/*блок скролиться в диапозон родителю*/
jQuery(document).ready(function ($) {
    $.scroll_block = {
        block_parent_selector: '.scroll_block_parent',
        block_scroll_selector: '.scroll_block_fixed',
        scroll_vector_old: $(window).scrollTop(),
        init: function () {
            var self = this;
            if ($(self.block_parent_selector + ' ' + self.block_scroll_selector).length) {
                self.BSblock_parent = $(self.block_parent_selector);
                self.BSbp_top = self.BSblock_parent.offset().top;
                self.BSbp_bottom = self.BSbp_top + self.BSblock_parent.height();
                self.BSblock = self.BSblock_parent.find(self.block_scroll_selector);
                self.BSblock_height = self.BSblock.height();
                self.BSf_width = self.BSblock.width();
                self.BSf_left = self.BSblock.offset().left;

                $(window).scroll(function () {
                    self.window_scroll();
                });
            }
        },
        window_scroll: function () {
            var self = this;
            if (self.BSblock_height >= self.BSblock_parent.height()) {
                self.BSblock.removeAttr('style');
                return false;
            }
            var height_ekran = document.body.clientHeight;
            var scroll = $(window).scrollTop();
            if (self.BSblock_height > height_ekran) {
                var min = self.BSbp_top + self.BSblock_height - height_ekran;
                var max = self.BSbp_bottom - self.BSblock_height;
                var block_top = self.BSblock.offset().top;
                var block_bottom = block_top + self.BSblock_height;
                var vverh = (self.scroll_vector_old > scroll);
                var vniz = (self.scroll_vector_old < scroll);
                if (scroll <= min && vniz) {
                    self.BSblock.removeAttr('style');
                }
                if (scroll <= self.BSbp_top && vverh) {
                    self.BSblock.removeAttr('style');
                }
                if (scroll >= max + (self.BSblock_height - height_ekran)) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'absolute',
                        'top': max,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }
                if (vniz && block_bottom < scroll + height_ekran && scroll < max + (self.BSblock_height - height_ekran)) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'fixed',
                        'bottom': 0,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }
                if (vverh && block_top > scroll && scroll < max && scroll > self.BSbp_top) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'fixed',
                        'top': 0,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }

                if (vniz && block_top >= scroll && scroll > min && scroll < max) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'absolute',
                        'top': block_top,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }

                if (vverh && block_bottom <= scroll + height_ekran && scroll > min && scroll < max) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'absolute',
                        'top': block_top,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }

            } else {
                var min = self.BSbp_top;
                var max = self.BSbp_bottom - self.BSblock_height;
                if (scroll <= min) {
                    self.BSblock.removeAttr('style');
                }
                if (scroll > min && scroll < max) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'fixed',
                        'top': 0,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }
                if (scroll >= max) {
                    self.BSblock.removeAttr('style').css({
                        'position': 'absolute',
                        'top': max,
                        'width': self.BSf_width,
                        'left': self.BSf_left
                    });
                }

            }
            self.scroll_vector_old = $(window).scrollTop();
        }
    }
});

$(document).ready(function () {
    $.scroll_block.init();
});
/*!блок скролиться в диапозон родителю*/
(function($) {
    FWP.hooks.addAction('facetwp/refresh/hierarchy_select', function($this, facet_name) {
        var selected_values = [];
        $this.find('.facetwp-hierarchy_select option:selected').each(function() {
            var value = $(this).attr('value');
            if (value.length) {
                selected_values.push(value);
            }
        });
        FWP.facets[facet_name] = selected_values;
    });

    FWP.hooks.addFilter('facetwp/selections/hierarchy_select', function(output, params) {
        var selected_values = [];
        var lowest_selected_child = params.el.find('.facetwp-hierarchy_select option:selected').not('[value=""]').last();
        if (lowest_selected_child.length) {
          var value = $(lowest_selected_child).attr('value');
          var text = $(lowest_selected_child).text().replace(/\([0-9]+\)$/, '');
          selected_values.push({ value: value, label: text });
        }
        return selected_values;
    });

    $(document).on('change', '.facetwp-type-hierarchy_select select', function() {
        var $this = $(this);
        var $parent = $this.closest('.facetwp-facet');
        var active_level = parseInt( $this.attr('data-level') );
        $parent.find('select').each(function(idx, el) {
            var level = parseInt( $(el).attr('data-level') );
            if (level > active_level) {
                $(el).val('');
            }
        });

        FWP.autoload();
    });
})(jQuery);

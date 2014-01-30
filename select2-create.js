/*
 Copyright 2014 Moises Narvaez - Koombea
 https://github.com/moisesnarvaez/select2-create

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in
 compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is
 distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 
  ----------------------------------------------------------------------------
  -Parameters in function-
  dataJSON: should have this structure: [{"id":25,"text":"LLC"},{"id":28,"text":"Interstudy"}]

  -Parameters in HTML element-
  data-url: the url to make the POST when a new element is created
  data-create-label: The label that appears when in the create option.
  ----------------------------------------------------------------------------
  Extended for select 2, view more in:
  Check https://github.com/ivaynberg/select2
 */

 (function ( $ ) {
 
  $.fn.select2Create = function(  dataJSON ) {

    var textField = this,
        createLabel = textField.data('create-label'),
        createURL = textField.data('url');
    
    var initSelect2WithCreate = function(){
      textField.select2({
        data: dataJSON,
        createSearchChoice:function(term, data) { 
          if ($(data).filter(function() { return this.text.localeCompare(term)===0; }).length===0) {
            return { id: term, text: term + createLabel };
          }
        },
        initSelection : function (element, callback) {
          var text = '';
          $.each(dataJSON, function(i, v) {
            if (v.id == element.val()) { text = v.text; }
          });
          var selected = {id: element.val(), text: text };
          callback(selected);
        }
      });
    };

    var bindEvents = function(){
      textField.on('change', function(event){
        var data = textField.select2("data");
        // If the element is new, we send the ajax request to create it.
        if(data.text.indexOf(createLabel) > 0){
          $.ajax({
            url: createURL,
            type: "post",
            data: { "term": data.id },
            dataType: "json",
            success: function(data){
              if(data==null){
                textField.select2("val", null);
              }else{
                var newOption = {id: data.id, text: data.name};
                textField.select2("destroy");
                dataJSON.push(newOption);
                initSelect2WithCreate();
                textField.select2("val", data.id);
              }
            }
          });
        }
      });
    };

    var init = function(){
      initSelect2WithCreate();
      bindEvents();
    }
    
    return init();

  };
 
}( jQuery ));

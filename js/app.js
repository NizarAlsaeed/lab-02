
function Image(image_url,title,description,keyword,horns){
    this.image_url = image_url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
    imgInstances.push(this);
}
const imgInstances=[];
Image.prototype.render=function(){
    let imgTemplate= $('#photo-template').clone();
    $('main').append(imgTemplate);
    imgTemplate.find('h2').text(this.title);
    console.log(imgTemplate);
    imgTemplate.find('img').attr('src',this.image_url);
    imgTemplate.find('p').text(this.description);
    imgTemplate.attr('id',this.title);
};

function getImagesData(){
    const ajaxSetting={
        method:'get',
        dataType:'json',
    };
    $.ajax('./data/page-1.json',ajaxSetting).then(data=>{
        data.forEach(element=>{
            new Image(element.image_url,element.title,element.description,element.keyword,element.horns);
        });
        createOptions();
        filter();
    }
    );
}
function createOptions(){
    imgInstances.forEach(element => {
        let optionEl=$('<option></option>');
        $('select').append(optionEl);
        optionEl.text(element.keyword).attr('value',element.keyword);
    });
}

function filter(){
    clearScreen();
    console.log('entered filter');
    imgInstances.forEach(element=>{
        if($('select').val() === element.keyword || $('select').val() === 'default'){
            element.render();
        }});
}

function clearScreen(){
    console.log('entered clearScreen');
    $('#photo-template').siblings().remove();
}

$(function(){
    getImagesData();
    $('select').change(filter);

});





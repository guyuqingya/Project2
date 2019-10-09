document.write("<script language=javascript src='/js/common.js'></script>");

function ObjStory(id, name, tag, teacher, instro) {
    this.id = id;
    this.name = name;
    this.tag = tag;
    this.teacher = teacher;
    this.instro = instro;
}

var courseInfo = [];
courseInfo.push(new ObjStory('1','数据结构','计算机基础','小红','这个课程叫数据结构'));
courseInfo.push(new ObjStory('2','操作系统','计算机基础','小红','这个课程叫操作系统'));
courseInfo.push(new ObjStory('3','计算机组成原理','计算机基础','小红','这个课程叫计算机组成原理'));
courseInfo.push(new ObjStory('4','编译原理','计算机基础','小红','这个课程叫编译原理'));
courseInfo.push(new ObjStory('5','javaScript编程语言','编程','小红','这个课程叫javaScript编程语言'));
courseInfo.push(new ObjStory('6','c++编程语言','编程','小红','这个课程叫c++编程语言'));

window.onload = function () {
    for (var i = 0; i < courseInfo.length; i++){
        //创建行
        var trObj = document.createElement("tr");
        // trObj.className = "tbTr";
        //创建单元格数组
        var tdObj = [];
        //创建每个单元格并赋值
        var ckObj = document.createElement("td");
        var check = document.createElement("input");
        check.type = "checkbox";
        check.setAttribute("index", courseInfo[i].id);
        ckObj.appendChild(check);
        var idObj = document.createElement("td");
        idObj.innerText = courseInfo[i].id;
        var nameObj = document.createElement("td");
        nameObj.innerText = courseInfo[i].name;
        var tagObj = document.createElement("td");
        tagObj.innerText = courseInfo[i].tag;
        var teacherObj = document.createElement("td");
        teacherObj.innerText = courseInfo[i].teacher;
        var instroObj = document.createElement("td");
        instroObj.innerText = courseInfo[i].instro;

        //将单元格放入单元格数组
        tdObj.push(ckObj);
        tdObj.push(idObj);
        tdObj.push(nameObj);
        tdObj.push(tagObj);
        tdObj.push(teacherObj);
        tdObj.push(instroObj);

        //将单元格放入行
        for (var j = 0; j < tdObj.length; j++) {
            trObj.appendChild(tdObj[j]);
        }
        //将行放入表格
        document.getElementById("courseTable").getElementsByTagName("tbody")[0].appendChild(trObj);
    }
    // for (var i = 0; i < tdObj.length; i++){
    //     trObj.appendChild(tdObj[i]);
    // }

///////////////////////////////////////////////////////////////////////
//复选框全选和不全选
    var ckAll = document.getElementById("cbAll");
    var cks = document.getElementById("cbs").getElementsByTagName("input");
    console.log(ckAll);
    console.log(cks);
    ckAll.onclick = function () {
        for (var i = 0; i < cks.length; i++) {
            cks[i].checked = this.checked;
        }
    };
    for (var j = 0; j < cks.length; j++) {
        cks[j].onclick = function () {
            var flag = true;
            for (var i = 0; i < cks.length; i++) {
                if (!cks[i].checked) {
                    flag = false;
                    break;
                }
            }
            ckAll.checked = flag;
        };
    }
///////////////////////////////////////////////////////////////////////
//给添加课程按钮添加点击事件
    var addbutton = document.getElementById("addCourse");
    addbutton.onclick = function () {
        document.getElementById("mask").style.display = "block";
        document.getElementById("addFile").style.display = "block";
    };
// 关闭弹窗按钮
    var close = document.getElementById("closePopUp");
    close.onclick = function () {
        // alert("jaj");
        document.getElementById("mask").style.display = "none";
        document.getElementById("addFile").style.display = "none";
    }
//翻页代码

// 导出课程
    var exportCou = document.getElementById("exportCou");
    exportCou.onclick = function () {
        var exportArray = [];
        for (var i = 0; i < cks.length; i++) {
            if (cks[i].checked) {
                exportArray.push(cks[i].getAttribute("index"));
            }
        }
        console.log(exportArray);
    };

// 删除课程
    var deleteCou = document.getElementById("deleteCou");
    deleteCou.onclick = function () {
        var deleteArray = [];
        for (var i = 0; i < cks.length; i++) {
            if (cks[i].checked) {
                deleteArray.push(cks[i].getAttribute("index"));
            }
        }
        for (var i = 0; i < deleteArray.length; i++){
            axios({
                url:'request_course_delete',//服务器地址
                method:'POST',//传输方法
                //根据后台
                params:{
                    file_id:deleteArray[i]
                },
                dataType:'json',//数据类型
                contentType:'application/json'
            }).then(res=>{//
                alert(res.data);
            })
        }

        console.log(deleteArray);

    };
};
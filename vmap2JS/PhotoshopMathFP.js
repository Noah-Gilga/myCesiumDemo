/*
   
   结束调用一个execute函数：执行一系列图像操作
*/
function PhotoshopMathFP(options) {
    this._ini();
    this.mapCom = options.vmap2;
    return this;
}
/*
   内部函数
*/
PhotoshopMathFP.prototype._ini = function(){
        var functionDef =  '\n\
        uniform vec4 u_initialColor;\n\
        //通用的混合函数\n\
        //#define Blend(base, blend, funcf) 		vec3(funcf(base.r, blend.r), funcf(base.g, blend.g), funcf(base.b, blend.b))\n\
        #define BlendColorDodgef(base, blend) 	((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))\n\
        #define BlendColorBurnf(base, blend) 	((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))\n\
        //#define BlendVividLight(base, blend) 	Blend(base, blend, BlendVividLightf)\n\
        #define BlendVividLightf(base, blend) 	((blend < 0.5) ? BlendColorBurnf(base, (2.0 * blend)) : BlendColorDodgef(base, (2.0 * (blend - 0.5))))\n\
        float blendColorCom(float base, float blend,int type) {\n\
            if(type==1)\n\
                return (blend==0.0)?base:min(base+blend,1.00); //线性减淡\n\
            else if(type==2){\n\
                return (blend==0.0)?base:min(base*blend,1.00); //正片叠底\n\
            }\n\
            else if(type==3){\n\
                return BlendVividLightf(base,blend); //亮光\n\
            }\n\
            else if(type==4){\n\
                return min(base+blend*(1.0-base),1.0); //滤色\n\
            }\n\
        }\n\
        vec3 blendColorCom(vec3 base, vec3 blend,int type) {\n\
            return vec3(blendColorCom(base.r,blend.r,type),blendColorCom(base.g,blend.g,type),blendColorCom(base.b,blend.b,type));\n\
        }\n\
        vec3 blendColorCom(vec3 base, vec3 blend, float opacity,int type) {\n\
            return (blendColorCom(base, blend,type) * opacity + base * (1.00 - opacity));\n\
        }\n\
        \n\
        #define BlendScreenf(base, blend) 		(1.0 - ((1.0 - base) * (1.0 - blend)))\n\
        #define LevelsControlInputRange(color, minInput, maxInput)	min(max(color - vec3(minInput), vec3(0.00)) / (vec3(maxInput) - vec3(minInput)), vec3(1.00))\n\
        #define LevelsControlInput(color, minInput, gamma, maxInput)	GammaCorrection(LevelsControlInputRange(color, minInput, maxInput), gamma)\n\
        #define LevelsControlOutputRange(color, minOutput, maxOutput) 			mix(vec3(minOutput), vec3(maxOutput), color)\n\
        #define LevelsControl(color, minInput, gamma, maxInput, minOutput, maxOutput) 	LevelsControlOutputRange(LevelsControlInput(color, minInput, gamma, maxInput), minOutput, maxOutput)\n\
        #define GammaCorrection(color,gamma)	vec3(pow(color.r, 1.00/gamma),pow(color.g, 1.00/gamma),pow(color.b, 1.00/gamma))\n\
        vec3 gammaCorrect(vec3 color, float gamma){\n\
            return pow(color, vec3(1.00/gamma));\n\
            \n\
        }'
    this.curPocess = 'texMapColor';//表示处理后得到的颜色是texMapColor
    //this.mapCom = options.vmap2;
    /*this.shaderModify{
        functionDef:函数定义，在片元着色器main函数前新增的函数，如果每个ps算法需要新定义函数都在此进行拼接
        mainstr：修改片元着色器main函数中的finalColor
    }*/
    this.shaderModify = {};
    this.shaderModify.functionDef = functionDef;
    this.shaderModify.mainstr='';

    //每一个处理函数都需要包含一个计数器count，记录该操作被执行多少次
    this.psGray_count = 0;
    this.psLevel_count = 0;
    this.psLinear_count = 0;
    this.psMultiply_count = 0;
    this.psVividLight_count = 0;
    this.psScreen_count = 0;
    this.psInverse_count = 0;
}

/*
   内部函数
*/
PhotoshopMathFP.prototype._Fini = function() {
    this._ini();//把相关变量置空，后续ini和fini可能有差别
}
/*
  灰度
  options{
      colorRatio：[0.4,0.6,0.4,0.6,0.2,0.8] //ps默认值
      reference:0.02
  }
*/
PhotoshopMathFP.prototype.psGray = function(options) {
    var reference = 0.0;//取0或者0.0着色器会报错
    if(options){
        if(options.reference!=undefined){
            reference = options.reference;
        }
    }
    var psGray = '\n\
        \n\
        //ps grey \n\
        vec3 greyColor_tmpIndex;\n\
        float r_tmpIndex=texMapColor.r;\n\
        float g_tmpIndex=texMapColor.g;\n\
        float b_tmpIndex=texMapColor.b;\n\
        float sumRgb_tmpIndex = r_tmpIndex+g_tmpIndex+b_tmpIndex;\n\
        float maxValue_tmpIndex=max(r_tmpIndex,max(g_tmpIndex,b_tmpIndex));\n\
        float minValue_tmpIndex=min(r_tmpIndex,min(g_tmpIndex,b_tmpIndex));\n\
        float midValue_tmpIndex=sumRgb_tmpIndex-maxValue_tmpIndex-minValue_tmpIndex;\n\
        float ratioMaxMid_tmpIndex;\n\
        if(minValue_tmpIndex==r_tmpIndex){\n\
        ratioMaxMid_tmpIndex = 0.60;//ratio[3]\n\
        }else if(minValue_tmpIndex==g_tmpIndex){\n\
        ratioMaxMid_tmpIndex = 0.60;//ratio[1]\n\
        }else{\n\
        ratioMaxMid_tmpIndex = 0.80;//ratio[5]\n\
        }\n\
        \n\
        float ratioMax_tmpIndex;\n\
        if(maxValue_tmpIndex==r_tmpIndex){\n\
        ratioMax_tmpIndex = 0.40;//ratio[0]\n\
        }else if(maxValue_tmpIndex==g_tmpIndex){\n\
        ratioMax_tmpIndex = 0.40;//ratio[2]\n\
        }else{\n\
        ratioMax_tmpIndex = 0.20;//ratio[4]\n\
        }\n\
        float tt_tmpIndex = (maxValue_tmpIndex-midValue_tmpIndex)*ratioMax_tmpIndex+(midValue_tmpIndex-minValue_tmpIndex)*ratioMaxMid_tmpIndex+minValue_tmpIndex;\n\
        //greyColor= vec3(tt-0.020);\n\
        float psGrayTmp_tmpIndex=float(reference);\n\
        greyColor_tmpIndex= vec3(tt_tmpIndex-psGrayTmp_tmpIndex);\n\
        \n\
    '
    //用当前的this.curPocess替换上面的texMapColor，意思是对前一步骤的图像进行本步骤的处理
    psGray = psGray.replace(/texMapColor/g, this.curPocess);
    psGray = psGray.replace(/reference/g, reference);
    psGray = psGray.replace(/tmpIndex/g, this.psGray_count);
    this.curPocess = 'greyColor_'+this.psGray_count;//表示处理后得到的颜色是texMapColor_0
    this.shaderModify.mainstr += psGray;
    this.psGray_count+=1;
}

/*
  反相
  options{
  }
*/
PhotoshopMathFP.prototype.psInverse = function(options) {
    var psInverse = '\n\
        \n\
        //ps Inverse \n\
        vec3 inverse_tmpIndex = texMapColor.rgb;\n\
        vec3 inverseColor_tmpIndex= vec3(1.0 - inverse_tmpIndex);\n\
        \n\
    '
    //用当前的this.curPocess替换上面的texMapColor，意思是对前一步骤的图像进行本步骤的处理
    psInverse= psInverse.replace(/texMapColor/g, this.curPocess);
    psInverse = psInverse.replace(/tmpIndex/g, this.psInverse_count);
    this.curPocess = 'inverseColor_'+this.psInverse_count;//表示处理后得到的颜色是texMapColor_0
    this.shaderModify.mainstr += psInverse;
    this.psInverse_count+=1;
}

/*
  调整色阶
  options{
      black：11
      white：240
      grayRotaio：2.43
  }
*/
PhotoshopMathFP.prototype.psLevel = function(options) {
    var inputBlack = 0.0;
    var inputWhite = 255.0;
    var grayRotaio = 1.0;
    if(options){
        if(options.black!=undefined){
            inputBlack = options.black/255.0;
        }
        if(options.white!=undefined){
            inputWhite = options.white/255.0;
        }
        if(options.grayRotaio!=undefined){
            grayRotaio = options.grayRotaio;
        }
    }
    var psLevel  = '\n\
        \n\
        //调整色阶\n\
        float psLevelTmpBlack_tmpIndex=float(inputBlack);\n\
        float psLevelTmpWhite_tmpIndex=float(inputWhite);\n\
        float psLevelTmpRotaio_tmpIndex=float(grayRotaio);\n\
        vec3  psLevelbaseColor_tmpIndex = texMapColor.rgb;\n\
        vec3 levelColor_tmpIndex = LevelsControlInput(psLevelbaseColor_tmpIndex.rgb, psLevelTmpBlack_tmpIndex,psLevelTmpRotaio_tmpIndex ,psLevelTmpWhite_tmpIndex );\n\
        \n\
    '
    psLevel = psLevel.replace(/texMapColor/g, this.curPocess);
    psLevel = psLevel.replace(/inputBlack/g, inputBlack);
    psLevel = psLevel.replace(/inputWhite/g, inputWhite);
    psLevel = psLevel.replace(/grayRotaio/g, grayRotaio);

    psLevel = psLevel.replace(/tmpIndex/g, this.psLevel_count);
    this.curPocess = 'levelColor_'+this.psLevel_count;
    this.shaderModify.mainstr += psLevel;
    this.psLevel_count+=1;
}

/*
  线性减淡
    options{
      r:
      g:
      b:
      a:  //不透明度 0-1
  }
*/
PhotoshopMathFP.prototype.psLinear = function(options) {
    var inputR = 0.0;
    var inputG = 0.0;
    var inputB = 0.0;
    var inputA = 0.0;
    if(options){
        if(options.r!=undefined){
            inputR = options.r/255.0;
        }
        if(options.g!=undefined){
            inputG = options.g/255.0;
        }
        if(options.b!=undefined){
            inputB = options.b/255.0;
        }
        if(options.a!=undefined){
            inputA = options.a;
        }
    }
    else{
        console.log('参数错误！');
    }
    var psLinear = '\n\
        \n\
        // 线性减淡\n\
        float psLinearTmpR_tmpIndex=float(inputR);\n\
        float psLinearTmpG_tmpIndex=float(inputG);\n\
        float psLinearTmpB_tmpIndex=float(inputB);\n\
        float psLinearTmpA_tmpIndex=float(inputA);\n\
        vec3  psLinearbaseColor_tmpIndex = texMapColor.rgb;\n\
        vec3 linearBlendColor_tmpIndex = vec3(psLinearTmpR_tmpIndex, psLinearTmpG_tmpIndex, psLinearTmpB_tmpIndex);\n\
        vec3 linearColor_tmpIndex = blendColorCom(psLinearbaseColor_tmpIndex, linearBlendColor_tmpIndex, psLinearTmpA_tmpIndex,1);\n\
        \n\
    '
    psLinear = psLinear.replace(/texMapColor/g, this.curPocess);
    psLinear = psLinear.replace(/inputR/g, inputR);
    psLinear = psLinear.replace(/inputG/g, inputG);
    psLinear = psLinear.replace(/inputB/g, inputB);
    psLinear = psLinear.replace(/inputA/g, inputA);

    psLinear = psLinear.replace(/tmpIndex/g, this.psLinear_count);

    this.curPocess = 'linearColor_'+this.psLinear_count;
    this.shaderModify.mainstr += psLinear;
    this.psLinear_count+=1;
}
/*
  正片叠底
    options{
        r:
        g:
        b:
        a:  //不透明度 0-1
    }
*/
PhotoshopMathFP.prototype.psMultiply = function(options) {
    //输入：texMapColor
    //输出：greyColor
    var inputR = 0.0;
    var inputG = 0.0;
    var inputB = 0.0;
    var inputA = 0.0;
    if(options){
        if(options.r!=undefined){
            inputR = options.r/255.0;
        }
        if(options.g!=undefined){
            inputG = options.g/255.0;
        }
        if(options.b!=undefined){
            inputB = options.b/255.0;
        }
        if(options.a!=undefined){
            inputA = options.a;
        }
    }
    else{
        console.log('参数错误！');
    }
    var psMultiply = '\n\
        \n\
        // 正片叠底\n\
        float psMultiplyTmpR_tmpIndex=float(inputR);\n\
        float psMultiplyTmpG_tmpIndex=float(inputG);\n\
        float psMultiplyTmpB_tmpIndex=float(inputB);\n\
        float psMultiplyTmpA_tmpIndex=float(inputA);\n\
        vec3 psMultiplybaseColor_tmpIndex = texMapColor.rgb;\n\
        vec3 multiplyBlendColor_tmpIndex = vec3(psMultiplyTmpR_tmpIndex, psMultiplyTmpG_tmpIndex, psMultiplyTmpB_tmpIndex);\n\
        vec3 multiplyColor_tmpIndex = blendColorCom(psMultiplybaseColor_tmpIndex, multiplyBlendColor_tmpIndex, psMultiplyTmpA_tmpIndex,2);\n\
        \n\
    '
    psMultiply = psMultiply.replace(/texMapColor/g, this.curPocess);
    psMultiply = psMultiply.replace(/inputR/g, inputR);
    psMultiply = psMultiply.replace(/inputG/g, inputG);
    psMultiply = psMultiply.replace(/inputB/g, inputB);
    psMultiply = psMultiply.replace(/inputA/g, inputA);

    psMultiply = psMultiply.replace(/tmpIndex/g, this.psMultiply_count);

    this.curPocess = 'multiplyColor_'+this.psMultiply_count;
    this.shaderModify.mainstr += psMultiply;
    this.psMultiply_count+=1;
}
/*
  亮光
    options{
        r:
        g:
        b:
        a:  //不透明度 0-1
    }
*/
PhotoshopMathFP.prototype.psVividLight = function(options) {
    //gl_FragColor = baseColor + baseColor * (2*blendColor - vec4(1.0)) / (2*(vec4(1.0)-blendColor));
    var inputR = 0.0;
    var inputG = 0.0;
    var inputB = 0.0;
    var inputA = 0.0;
    if(options){
        if(options.r!=undefined){
            inputR = options.r/255.0;
        }
        if(options.g!=undefined){
            inputG = options.g/255.0;
        }
        if(options.b!=undefined){
            inputB = options.b/255.0;
        }
        if(options.a!=undefined){
            inputA = options.a;
        }
    }
    else{
        console.log('参数错误！');
    }
    var psVividLight = '\n\
        \n\
        // 亮光\n\
        float psVividLightTmpR_tmpIndex=float(inputR);\n\
        float psVividLightTmpG_tmpIndex=float(inputG);\n\
        float psVividLightTmpB_tmpIndex=float(inputB);\n\
        float psVividLightTmpA_tmpIndex=float(inputA);\n\
        vec3 psVividLightbaseColor_tmpIndex = texMapColor.rgb;\n\
        vec3 vividLightBlendColor_tmpIndex = vec3(psVividLightTmpR_tmpIndex, psVividLightTmpG_tmpIndex, psVividLightTmpB_tmpIndex);\n\
        vec3 vividLightColor_tmpIndex = blendColorCom(psVividLightbaseColor_tmpIndex,vividLightBlendColor_tmpIndex,psVividLightTmpA_tmpIndex,3);\n\
        \n\
    '
    psVividLight = psVividLight.replace(/texMapColor/g, this.curPocess);
    psVividLight = psVividLight.replace(/inputR/g, inputR);
    psVividLight = psVividLight.replace(/inputG/g, inputG);
    psVividLight = psVividLight.replace(/inputB/g, inputB);
    psVividLight = psVividLight.replace(/inputA/g, inputA);

    psVividLight = psVividLight.replace(/tmpIndex/g, this.psVividLight_count);

    this.curPocess = 'vividLightColor_'+this.psVividLight_count;
    this.shaderModify.mainstr += psVividLight;
    this.psVividLight_count+=1;
}
/*
  滤色：A+B(1-A/255)
    options{
        r:
        g:
        b:
        a:  //不透明度 0-1
    }
*/
PhotoshopMathFP.prototype.psScreen = function(options) {
    var inputR = 0.0;
    var inputG = 0.0;
    var inputB = 0.0;
    var inputA = 0.0;
    if(options){
        if(options.r!=undefined){
            inputR = options.r/255.0;
        }
        if(options.g!=undefined){
            inputG = options.g/255.0;
        }
        if(options.b!=undefined){
            inputB = options.b/255.0;
        }
        if(options.a!=undefined){
            inputA = options.a;
        }
    }
    else{
        console.log('参数错误！');
    }
    var psScreen = '\n\
        \n\
        // 滤色\n\
        float psScreenTmpR_tmpIndex=float(inputR);\n\
        float psScreenTmpG_tmpIndex=float(inputG);\n\
        float psScreenTmpB_tmpIndex=float(inputB);\n\
        float psScreenTmpA_tmpIndex=float(inputA);\n\
        vec3 psScreenbaseColor_tmpIndex = texMapColor.rgb;\n\
        vec3 screenBlendColor_tmpIndex = vec3(psScreenTmpR_tmpIndex, psScreenTmpG_tmpIndex, psScreenTmpB_tmpIndex);\n\
        vec3 screenColor_tmpIndex = blendColorCom(psScreenbaseColor_tmpIndex,screenBlendColor_tmpIndex,psScreenTmpA_tmpIndex,4);\n\
        \n\
    '
    psScreen = psScreen.replace(/texMapColor/g, this.curPocess);
    psScreen = psScreen.replace(/inputR/g, inputR);
    psScreen = psScreen.replace(/inputG/g, inputG);
    psScreen = psScreen.replace(/inputB/g, inputB);
    psScreen = psScreen.replace(/inputA/g, inputA);

    psScreen = psScreen.replace(/tmpIndex/g, this.psScreen_count);

    this.curPocess = 'screenColor_'+this.psScreen_count;
    this.shaderModify.mainstr += psScreen;
    this.psFScreen_count+=1;
}
/*
options :预留字段
*/
PhotoshopMathFP.prototype.execute = function (options) {
    // if(this.shaderModify.mainstr.indexOf('finalColor')>=0){
    //     this.shaderModify.mainstr = '';
    // }
    //在着色器main中头添加texMapColor
    var head = 'vec4 texMapColor = computeDayColor(u_initialColor, clamp(v_textureCoordinates, 0.0, 1.0));';
    this.shaderModify.mainstr = head+this.shaderModify.mainstr;

    //在着色器main中尾添加finalColor
    var trail = 'vec4 finalColor = vec4(' + this.curPocess +',1.0)';
    this.shaderModify.mainstr = this.shaderModify.mainstr + trail;

    //执行
    this.mapCom._invertMapColorEX(this.shaderModify);//head,main的着色器片段,在invertMapColorEX中进行拼接

    //清空字符串记录
    this._Fini();
}

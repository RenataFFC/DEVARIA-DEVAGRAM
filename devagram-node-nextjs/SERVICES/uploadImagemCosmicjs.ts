import multer from "multer";
import cosmicjs from 'cosmicjs';


const{
CHAVE_DE_GRAVACAO_AVATARES,
CHAVE_DE_GRAVACAO_PUBLICACOES,
BUCKET_AVATARES,
BUCKET_PUBLICACOES} = process.env;

const Cosmic = cosmicjs();
const bucketAvatares = Cosmic.bucket({
slug: BUCKET_AVATARES,
write_key:CHAVE_DE_GRAVACAO_AVATARES
});


const bucketPublicacoes = Cosmic.bucket({
slug: BUCKET_PUBLICACOES,
write_key:CHAVE_DE_GRAVACAO_PUBLICACOES
});

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

const uploadImagemCosmic = async(req: any) =>{
if(req?.file?.originalname){


  if(!req.file.originalname.includes('.png') &&
            !req.file.originalname.includes('.jpg') && 
            !req.file.originalname.includes('.jpeg')){
                throw new Error('Extensao da imagem invalida');
        } 

    const media_objetc = {
    originalname: req.file.originalname,
    buffer: req.file.buffer
    };

if(req.url && req.url.includes('publicacao')){
     return await bucketPublicacoes.addMedia({media: media_objetc});
}else{
    return await bucketAvatares.addMedia({media: media_objetc});
}

}
};

export{upload, uploadImagemCosmic};
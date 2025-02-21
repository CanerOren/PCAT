import mongoose from 'mongoose';
// const mongoose= require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// !create a photo
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo description 2 lorem ipsum',
// });

// ! read a photo
// async function readPhotos(){
//   try{
//     const photos = await Photo.find({});
//     if(photos.length === 0 ){
//       console.log('Veri tabaninda hic fotograf bulunamadi');
//       return;
//     }
//     console.log(`Fotograflar: ${photos}`);
//   }catch(error){
//     console.error(`Hata olustu ${error}`);
//   }
// };
// readPhotos();


// !update photo
// async function updatePhoto(id) {
//   try {
    
//     const updatedPhoto = await Photo.findByIdAndUpdate(
//       id,
//       {
//         title: 'Photo Title 1 Updated',
//         description: 'Photo description 1 updated',
//       },
//       { new: true } // Güncellenmiş veriyi geri döndür
//     );

//     if (!updatedPhoto) {
//       console.log("Belirtilen ID ile fotoğraf bulunamadı.");
//       return;
//     }

//     console.log("Güncellenen Fotoğraf:", updatedPhoto);
//   } catch (error) {
//     console.error("Hata oluştu:", error);
//   }
// }
// const id = '67b59f887cc6d2d7371a90e6';
// updatePhoto(id);



// ! delete a photo

async function deletePhotoById(photoId){
  try{
    const deletedPhoto = await Photo.findByIdAndDelete(photoId);
    if(!deletedPhoto){
      console.log('Belirtilen ID ile fotograf bulunamadi.');
      return;
    }
    console.log(`Silinen fotograf: ${deletedPhoto}`);
  }catch(error){
    console.error(`Hata olustu: ${error}`);
  }
}

const id = '67b59f887cc6d2d7371a90e6';
deletePhotoById(id);
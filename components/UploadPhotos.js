import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { useAuth, useFirestore } from '../services/firebase';

export const UploadPhotos = () => {
  const firestore = useFirestore();
  const auth = useAuth();

  const successCallBack = (res) => {
    console.log('photos uploaded');
    console.log(res);
    const { info } = res;
    const { eager } = info;
    const photoData = {
      bytes: info.bytes,
      format: info.format,
      height: info.height,
      original_filename: info.original_filename,
      resource_type: info.resource_type,
      tags: info.tags,
      uploaded_at: info.created_at,
      url: info.secure_url,
      userId: auth.user.uid,
      width: info.width,
      eager: eager[0] && {
        url: eager[0].secure_url,
        height: eager[0].height,
        width: eager[0].width,
        bytes: eager[0].bytes,
      },
    };
    // TODO add server timestamp
    firestore.savePhoto(photoData).then((docRef) => {
      console.log('document written with ID:', docRef.id);
    });

    /*
  example res
  {
    event: "success",
    info: {
      bytes: 14904,
      created_at: "2021-02-01T00:43:11Z",
      eager: [{…}],
      format: "png",
      height: 318,,
      original_filename: "Screen Shot 2021-01-28 at 10.40.10 AM",
      resource_type: "image",
      secure_url: "https://res.cloudinary.com/calamityadam/image/upload/v1612140191/,photoblog/hnjxzfl1tmq5wnorhemv.png",
      tags: [],
      width: 1280
    }
  */
  };

  const failureCallBack = (res) => {
    console.log('photos uploaded');
    console.log(res);
  };

  return (
    <div>
      <h1>hello from upload photos</h1>
      <WidgetLoader />
      <Widget
        sources={['local', 'camera']}
        resourceType={'image'}
        cloudName={'calamityadam'}
        uploadPreset={'levisisk'}
        buttonText={'Upload Images'} // default 'Upload Files'
        style={{
          color: 'white',
          border: 'none',
          width: '120px',
          backgroundColor: 'green',
          borderRadius: '4px',
          height: '25px',
        }} // inline styling only or style id='cloudinary_upload_button'
        folder={'levisisk'} // set cloudinary folder name to send file
        cropping={false}
        onSuccess={successCallBack} // add success callback -> returns result
        onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
        logging={true} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        use_filename={false}
        // file as its public ID -> default = true,
      />
    </div>
  );
};

export default UploadPhotos;

import { useState, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import { type ImageSource } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import domToImage from 'dom-to-image';

import ImageViewer from '@/components/ImageView';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showAppOptins, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  // 调用相册，选择照片
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      // set image
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1
        });

        await MediaLibrary.saveToLibraryAsync(localUri);

        if (localUri) {
          alert('Image saved successfully');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* 图片区域 */}
        <View style={styles.imageContainer}>
          {/* 图片 */}
          <View ref={imageRef} collapsable={false}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            {/* 已选择的表情 */}
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
        </View>

        {showAppOptins ? (
          // 对图片的操作选项
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon='refresh' label='Reset' onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          // 按钮
          <View>
            <Button label='Choose Image' theme='primary' onPress={pickImageAsync} />
            <Button label='Use this Image' onPress={() => setShowAppOptions(true)} />
          </View>
        )}

        {/* 表情选择器 */}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

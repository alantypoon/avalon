

# download aws cli: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
# aws configure
# aws_access_key_id = 
# aws_secret_access_key =
# region = us-east-1

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '請所有人閉上眼睛，低頭雙手握拳放在自己面前。' \
    'voices/Hiujin/1.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '除了奧伯倫以外，' \
    'voices/Hiujin/2.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '請壞人張開眼睛確認彼此身份，5，4，3，2，1，請壞人閉上眼睛。' \
    'voices/Hiujin/3.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '除了莫德雷德之外，' \
    'voices/Hiujin/4.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '請所有壞人豎起你們的大拇指，請梅林張開眼睛確認壞人身份，5，4，3，2，1，請壞人收起大拇指請梅林閉上眼睛。' \
    'voices/Hiujin/5.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '請梅林和莫甘娜豎起你們的大拇指，請派希維爾張開眼睛確認身分，5，4，3，2，1，請梅林和莫甘娜收回大拇指，請派希維爾閉上眼睛。' \
    'voices/Hiujin/6.mp3'

aws polly synthesize-speech \
    --engine neural \
    --output-format mp3 \
    --voice-id Hiujin \
    --text '請所有人張開眼睛遊戲開始。' \
    'voices/Hiujin/7.mp3'

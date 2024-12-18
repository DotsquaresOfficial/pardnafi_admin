import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'
import './fakeApi/commonFakeApi'
import './fakeApi/accountsFakeApi'
import './fakeApi/usersFakeApi'
import './fakeApi/chatFakeApi'
import './fakeApi/inquiryFakeApi'
import './fakeApi/faqApi'

mock.onAny().passThrough()

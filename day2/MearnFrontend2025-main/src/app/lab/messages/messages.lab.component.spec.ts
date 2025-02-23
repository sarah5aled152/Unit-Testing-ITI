import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponentForLab } from './messages.lab.component';
import { MessageService } from '../../services/message/message.service';

describe("2-message component integration testing:", () => {
    let component: MessagesComponentForLab;
    let fixture: ComponentFixture<MessagesComponentForLab>;
    let messageService: MessageService;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessagesComponentForLab],
            providers: [MessageService]
        }).compileComponents();
        
        fixture = TestBed.createComponent(MessagesComponentForLab);
        component = fixture.componentInstance;
        messageService = TestBed.inject(MessageService);
        fixture.detectChanges();
    });
    
    it("expect component template to be empty", () => {
        // Initially the messages array should be empty
        expect(messageService.messages.length).toBe(0);
        
        // The container div should not exist when there are no messages
        const containerElement = fixture.nativeElement.querySelector('#container');
        expect(containerElement).toBeNull();
    });
    
    it("then expect div.msg to have the messages after setting it", () => {
        // Add test messages
        const testMessages = [
            { id: 1, message: 'Test Message 1' },
            { id: 2, message: 'Test Message 2' }
        ];
        messageService.messages = testMessages;
        
        // Trigger change detection
        fixture.detectChanges();
        
        // Container should now exist
        const containerElement = fixture.nativeElement.querySelector('#container');
        expect(containerElement).toBeTruthy();
        
        // Check if h2 exists
        const h2Element = containerElement.querySelector('h2');
        expect(h2Element.textContent).toBe('Messages');
        
        // Verify message elements
        const messageElements = fixture.nativeElement.querySelectorAll('.msg');
        expect(messageElements.length).toBe(2);
        expect(messageElements[0].textContent).toBe('Test Message 1');
        expect(messageElements[1].textContent).toBe('Test Message 2');
    });
});
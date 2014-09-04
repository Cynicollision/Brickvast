/*
describe('Class: name of test', function () {
    it('does stuff', function () {
        // code + https://github.com/pivotal/jasmine/wiki/Matchers
        expect(returned_type).toEqual("testEntity");
    });
});

*/


//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//
describe('TheDOM class tests', function () {
    it('Uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        var theCanvas = $("#theCanvas");

        // assert
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    })
});




//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//

describe('CanvasManager: Can find the drawing context', function () {
    it('Retrieves and stores a local this.context from the TheDOM class', function () {
        var cm = new CanvasManager();

        // assert
        expect(cm).toBeDefined();
    });
});


//************************************************************************************//
// Test suite for Controller and Entity classes
//************************************************************************************//
describe('Controller: addEntity and getEntityById to copare on Entity ID values', function () {
    it('adds an entity to the managed collection, then retrieves by the same Entity ID to verify we have a type match', function () {
        var entity_id = 'entId1';
        var entity1 = new Entity(null, entity_id);
        entity1.type = "testEntity";
        var controller1 = new Controller();

        controller1.addEntity(entity1);
        var entity2 = controller1.getEntityById(entity_id);
        var returned_type = entity2.type;

        // assert
        expect(returned_type).toEqual("testEntity");
    })
});

describe('Controller: sortEntities sorts correctly', function () {
    it('sorts the managed collection of Entity objects in descending order by depth (largest (deepest) drawn first)', function () {
        var ctrl = new Controller();
        var ent1 = new Entity(null, "e1");
        ctrl.addEntity(ent1);
        ent1.depth = 50;
        var ent2 = new Entity(null, "e2");
        ent2.depth = 100;
        ctrl.addEntity(ent2);
        var ent3 = new Entity(null, "e3");
        ent3.depth = -10;
        ctrl.addEntity(ent3);
        var ent4 = new Entity(null, "e4");
        ent4.depth = 20;
        ctrl.addEntity(ent4);

        // do the sort
        ctrl.sortEntities();
        var sortedEntities = ctrl.getEntities();

        // assert
        expect(sortedEntities[0].id).toEqual("e2");
        expect(sortedEntities[1].id).toEqual("e1");
        expect(sortedEntities[2].id).toEqual("e4");
        expect(sortedEntities[3].id).toEqual("e3");
    })
});


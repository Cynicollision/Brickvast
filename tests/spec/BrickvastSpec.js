
/*
describe('Class: name of test', function () {
    it('does stuff', function () {
        // code + https://github.com/pivotal/jasmine/wiki/Matchers
        expect(returned_type).toEqual("testEntity");
    });
});

*/


//************************************************************************************//
// Test suite for AssetManager class
//************************************************************************************//
describe('AssetManager', function () {
    var testAssetManager;

    beforeEach(function () {
        testAssetManager = new AssetManager('image');
    });

    it('Adds and retrieves resources by ID value', function () {
        testAssetManager.add('testAsset', 'src/tile.png');
        var asset = testAssetManager.getById('testAsset');
        expect(testAssetManager.assets[0].id).toEqual('testAsset');
        expect(testAssetManager.assets[0].source).toEqual('src/tile.png');
        expect(asset).not.toBeDefined();
    });

});


//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//
describe('CanvasManager', function () {

    it('Retrieves and stores a local this.context from the TheDOM class', function () {
        var cm = new CanvasManager();
        expect(cm.context).toBeDefined();
    }),

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var cm = new CanvasManager();
        var testX = 25, testY = 50;

        var ctrl = new Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = cm.getViewRelativeX(ctrl);
        var relY = cm.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    })

});


//************************************************************************************//
// Test suite for Controller and Entity classes
//************************************************************************************//
describe('Controller - entity management', function () {
    var testController;

    beforeEach(function () {
        testController = new Controller();
    });

    it('Has a defined View property upon instantiation', function () {
        expect(testController.view).toBeDefined();
    });

    it('Adds an entity to the managed collection that can be retrieved by Entity ID', function () {
        var entity_id = 'entId1';
        var entity1 = new Entity(null, entity_id);
        entity1.type = "testEntity";

        testController.addEntity(entity1);
        var entity2 = testController.getEntityById(entity_id);
        var returned_type = entity2.type;

        expect(returned_type).toEqual("testEntity");
    }),

    it('Sorts the managed collection of Entity objects in descending order by depth (largest = deepest first)', function () {
        var ent1 = new Entity(null, "e1");
        testController.addEntity(ent1);
        ent1.depth = 50;
        var ent2 = new Entity(null, "e2");
        ent2.depth = 100;
        testController.addEntity(ent2);
        var ent3 = new Entity(null, "e3");
        ent3.depth = -10;
        testController.addEntity(ent3);
        var ent4 = new Entity(null, "e4");
        ent4.depth = 20;
        testController.addEntity(ent4);

        // do the sort
        testController.sortEntities();
        var sortedEntities = testController.getEntities();

        expect(sortedEntities[0].id).toEqual("e2");
        expect(sortedEntities[1].id).toEqual("e1");
        expect(sortedEntities[2].id).toEqual("e4");
        expect(sortedEntities[3].id).toEqual("e3");
    }),

    it('Removes destroyed Entity objects from the managed collection', function () {
        // start with five
        testController.addEntity(new Entity(null, 'ent1'));
        testController.addEntity(new Entity(null, 'ent2'));
        testController.addEntity(new Entity(null, 'ent3'));
        testController.addEntity(new Entity(null, 'ent4'));
        testController.addEntity(new Entity(null, 'ent5'));

        // destroy two
        testController.getEntityById('ent2').destroy();
        testController.getEntityById('ent5').destroy();

        // remove from the Controller
        testController.removeDestroyedEntities();

        expect(testController.entities.length).toEqual(3);
    })

    // TODO: enhance test to check for clicking on multiple entities
    it('Passes on-click coordinates to the clicked-on entity/entities', function () {
        var ent1 = new Entity(null, 'ent1');
        ent1.setSize(100, 100);
        ent1.x = 50;
        ent1.y = 50;
        testController.addEntity(ent1);

        var mockClickEvent = { pageX: 60, pageY: 80 };

        // the spy
        spyOn(ent1, 'click')

        // force a call to click()
        testController.click(mockClickEvent);

        expect(ent1.click).toHaveBeenCalled();
    })
});


//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    it('Defines global objects for managing various resources', function () {
        expect(Game.Assets).toBeDefined();
        expect(Game.Assets.Images).toBeDefined();
        expect(Game.Assets.Audio).toBeDefined();
        expect(Game.CanvasManager).toBeDefined();
    });
});


//************************************************************************************//
// Test suite for MathUtil class
//************************************************************************************//
describe('MathUtil', function () {
    it('Calculates the distance between points (x1, y1) and (x2, y2)', function () {
        var d, x1, y1, x2, y2;
        
        x1 = 0;
        y1 = -50;
        x2 = 0;
        y2 = 100;

        d = MathUtil.getPointDistance(x1, y1, x2, y2);
        expect(d).toEqual(150);

        x1 = 5;
        y1 = 6;
        x2 = -7;
        y2 = 11;

        d = MathUtil.getPointDistance(x1, y1, x2, y2);
        expect(d).toEqual(13);
    })

    //it('Calculates the direction from two points (x1, y1) to (x2, y2)', function () {
    //    var d, x1, y1, x2, y2;

    //    x1 = 0;
    //    y1 = 50;
    //    x2 = 0;
    //    y2 = 100;

    //    d = MathUtil.getPointDirection(x1, y1, x2, y2);
    //    expect(d).toEqual(90);

    //    x1 = 0;
    //    y1 = 0;
    //    x2 = 45;
    //    y2 = 45;

    //    d = MathUtil.getPointDirection(x1, y1, x2, y2);
    //    expect(Math.floor(d)).toEqual(45);
    //    x1 = 0;
    //    y1 = 0;
    //    x2 = 45;
    //    y2 = -45;

    //    d = MathUtil.getPointDirection(x1, y1, x2, y2);
    //    expect(Math.floor(d)).toEqual(45);
    //})

    //it('', function () {
    //}),

    //it('', function () {
    //})
});


//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//
describe('TheDOM', function () {

    it('Uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        var theCanvas = $("#theCanvas");
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    })

});

